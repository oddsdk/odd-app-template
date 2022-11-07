import * as did from 'webnative/did/index'
import * as dataRoot from 'webnative/data-root'
import * as namefilter from 'webnative/fs/protocol/private/namefilter.js'
import * as path from 'webnative/path.js'
import * as ucan from 'webnative/ucan/index'
import * as webnative from 'webnative'
import * as webnativeIpfs from 'webnative/ipfs/index.js'
import FileSystem from 'webnative/fs/filesystem.js'
import PrivateTree from 'webnative/fs/v1/PrivateTree.js'
import MMPT from 'webnative/fs/protocol/private/mmpt.js'

import { USE_WNFS_IMPLEMENTATION } from 'webnative/auth/implementation/use-wnfs'
import { setImplementations } from 'webnative/setup'

export const recoverFilesystem = async (): Promise<void> => {
  setImplementations(USE_WNFS_IMPLEMENTATION)

  // const existingDid = await did.root()

  // if (existingDid) {
  //   throw an error, user already signed in
  // }

  // TODO read username and readKey from recovery kit
  const username = 'gins240'
  const readKey = 'iDvcZQvtqTCmI7AeP1WvCmwJlxZQcIKkMEr6aUZ3ZEU='

  // Verify recovery kit is valid, early exit if not
  const validRecoveryKit = await verifyRecoveryKit(username, readKey)
  console.log('Recovery kit is valid: ', validRecoveryKit)

  // Create a new key pair and key store
  const newDid = await did.write()
  console.log('New DID: ', newDid)

  // Register as a new user
  const registered = await webnative.account.register({ username: 'gins241'})
  console.log('Registered: ', registered)

  // Assign the filesystem to the new user
  await assignFilesystem(username, readKey)

  // TODO Prompt the user to create a new recovery kit


}


// VERIFY

const verifyRecoveryKit = async (username: string, readKey: string): Promise<boolean> => {
  // Look up filesystem by username
  const rootCID = await dataRoot.lookupOnFisson(username)
  console.log('FS CID: ', rootCID)

  // Resolve private filesystem CID
  const ipfs = await webnativeIpfs.get()
  const { cid: mmptCID } = await ipfs.dag.resolve(`/ipfs/${rootCID}/private`)
  console.log('MMPT CID', mmptCID)

  // Check that private root corresponding to readKey exists
  const mmpt = await MMPT.fromCID(mmptCID)
  const privateName = await getRootBlockPrivateName(readKey)
  const privateRootExists = await mmpt.exists(privateName)

  return privateRootExists
}

async function getRootBlockPrivateName(key: string): Promise<namefilter.PrivateName> {
  const bareName = await namefilter.createBare(key)
  const revisionName = await namefilter.addRevision(bareName, key, 1)
  return await namefilter.toPrivateName(revisionName)
}


// RECOVERY

const assignFilesystem = async (oldUsername: string, readKey: string): Promise<void> => {
  const cid = await dataRoot.lookup(oldUsername)

  const fs = await FileSystem.fromCID(cid, {
    permissions: {
      fs: {
        public: [path.root()],
        private: [],
      }
    }
  })

  console.log('Adding new private root')

  const newPrivateRoot = await PrivateTree.create(fs.root.mmpt, readKey, null)
  fs.root.privateNodes[path.toPosix(path.directory('private'))] = newPrivateRoot
  await newPrivateRoot.put()
  await fs.root.updatePuttable('private', fs.root.mmpt)
  const newCID = await fs.root.mmpt.put()
  await fs.root.addPrivateLogEntry(newCID)

  console.log('Updating data root')

  await uploadFileSystem(fs)

  console.log('Private filesystem recovered')

  return 
}

async function uploadFileSystem(fs: FileSystem): Promise<void> {
  const issuer = await did.write()
  const fsUcan = await ucan.build({
    potency: 'APPEND',
    resource: '*',

    audience: issuer,
    issuer
  })
  await dataRoot.update(await fs.root.put(), ucan.encode(fsUcan))
}