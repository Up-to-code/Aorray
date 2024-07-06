import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  Query,
} from "react-native-appwrite";

export const appwriteConfig = {
  endPoint: "https://cloud.appwrite.io/v1",
  platform: "com.aorry.code",
  appId: "6688196b00021a902ad7",
  dtaaBaseId: "66881bde002db6dee513",
  UserCollectionId: "66881c36003da02ccf3a",
  videoCollectionId: "66881c680024200ca0e6",
  filesStoreId: "66881eef00020ff007d3",
};

// Init your React Native SDK
const client = new Client();

client
  .setEndpoint(appwriteConfig.endPoint) // Your Appwrite Endpoint
  .setProject(appwriteConfig.appId) // Your project ID
  .setPlatform(appwriteConfig.platform); // Your application ID or bundle ID.

const account = new Account(client);
const Avatar = new Avatars(client);
const Database = new Databases(client);

export const CreateUser = async (email, password, name) => {
  try {
    const user = await account.create(ID.unique(), email, password, name);
    if (!user) throw new Error("Failed to create user");
    const AvatarURL = Avatar.getInitials(user.name);
    const newUser = await Database.createDocument(
      appwriteConfig.dtaaBaseId,
      appwriteConfig.UserCollectionId,
      ID.unique(),
      {
        accountid: user.$id,
        UseName: user.name,
        emial: user.email,
        Avtar: AvatarURL,
      }
    );

    return newUser;
  } catch (error) {
    console.log(error, "error");
    throw new Error(error);
  }
};

export const Login = async (email, password) => {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    if (!session) throw new Error("Failed to create user");
    return session;
  } catch (error) {
    console.log(error);
    throw new Error(error);
    return null;
  }
};

export async function getAccount() {
  try {
    const currentAccount = await account.get();
    return currentAccount;
  } catch (error) {
    throw new Error(error);
  }
}

export const GetUser = async () => {
  try {
    const User = await getAccount();
    if (!User) throw new Error("Failed to create user");
    const CurrentUser = await Database.listDocuments(
      appwriteConfig.dtaaBaseId,
      appwriteConfig.UserCollectionId,
      [Query.equal("accountid", User.$id)]
    );


    if (!CurrentUser) throw new Error("Failed to create user");

    return CurrentUser.documents[0];
  } catch (error) {}
};

export const getAllPosts = async () => {
  try {
    const posts = await Database.listDocuments(
      appwriteConfig.dtaaBaseId,
      appwriteConfig.videoCollectionId
    );
    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
};



export const getLatestPosts = async () => {
  try {
    const posts = await Database.listDocuments(
      appwriteConfig.dtaaBaseId,
      appwriteConfig.videoCollectionId,
      [Query.orderDesc("$createdAt", Query.limit(5))],
    );
    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
};