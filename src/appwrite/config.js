import { Client, Databases, Storage, Query, ID } from 'appwrite';
import conf from '../conf/conf';

export class Service {
 client = new Client();
 databases;
 bucket;

 constructor() {
  this.client
   .setEndpoint(conf.appwriteUrl)
   .setProject(conf.appwriteProjectId);

  this.databases = new Databases(this.client);
  this.bucket = new Storage(this.client);
 }
 async createPost({ title, slug, content, contentImg, status, userId }) {
  try {
   return await this.databases.createDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, slug, {
    title,
    content,
    contentImg,
    status,
    userId
   });
  } catch (error) {
   console.error(error);
  }
 }

 async updatePost(slug, { title, content, contentImg, status, userId }) {
  try {
   return await this.databases.updateDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, conf.appwriteUrl, {
    title, content, contentImg, status,
   })
  } catch (error) {
   console.error(error);
  }
 }

 async deletePost(slug) {
  try {
   await this.databases.deleteDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, slug);
   return true;
  } catch (error) {
   console.error(error);
   return false;
  }
 }

 async getPost(slug) {
  try {
   return await this.databases.getDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, slug);
  } catch (error) {
   console.error(error);
   return false;
  }
 }

 async getPosts(queries = [Query.equal("status", "active")]) {
  try {
   return await this.databases.listDocuments(conf.appwriteDatabaseId, conf.appwriteCollectionId, queries)
  } catch (error) {
   console.error(error);
  }
 }

 // file upload services
 async uploadFile(file) {
  try {
   return await this.bucket.createFile(conf.appwriteBucketId, ID.unique(), file)
  } catch (error) {
   console.log(error);
  }
 }

 async deleteFile(fileID) {
  try {
   await this.bucket.deleteFile(conf.appwriteBucketId, fileID)
   return true
  } catch (error) {
   console.log(error);
   return false;
  }
 }

 getFilePreview(fileID) {
  return this.bucket.getFilePreview(
   conf.appwriteBucketId,
   fileID
  )
 }
}
const service = new Service();

export default service