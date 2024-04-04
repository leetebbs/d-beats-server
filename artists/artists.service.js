const { db } = require("../db/db.js");

const artistService = {
  async submitArtistApplication(userId, twitterHandle) {
    const wallet = "0x1ABc133C222a185fEde2664388F08ca12C208F76";
    const colls = 2;
   const nuSales = 0;
   const userIdd = 1;
    const twitter = "LTebbs2";
    const Verif = true;

     try {
      //  const db = await initDb();
      console.log("trying")
       const data = { wallet, colls, nuSales, userIdd, twitter, Verif };
       // Assuming 'artists' is the collection name and 'userId' is the document ID
       const tx = await db.add(data,"Artist");// this where you change the collection name
       if (tx) {
         console.log("success");
          return tx;
       } else {
         console.log("failed", tx);
       }
     } catch (error) {
       console.error(error); // Log the original error
       throw new Error(`Error submitting artist application: ${error.message}`);
     }
  },

  async getArtists(){
    const result = await db.get("Artist");
    return result;
  },
  // const addTask = async (task) => {
  //   await db.add(
  //     {
  //       task,
  //       date: db.ts(),
  //       user_address: db.signer(),
  //       done: false,
  //     },
  //     "tasks",
  //     user
  //   );
  //   await getTasks();
  // };
  // Other methods remain unchanged


// const artistService = {
//  async submitArtistApplication(userId, twitterHandle, verificationStatus) {
//     try {
//       const data = { userId, twitterHandle ,verificationStatus:"pending"}; // Corrected key names
//       // Assuming 'owner' is defined elsewhere or passed as an argument
//       const tx = await db.setArtistApplicationData(data, "artists", owner);
//       if (tx) {
//         console.log("success");
//       } else {
//         console.log("failed",tx);
//       }
//     } catch (error) {
//       console.error(error); // Log the original error
//       throw new Error(`Error submitting artist application: ${error.message}`);
//     }
//   },
  async getPendingApplications() {
    try {
      // Fetch the list of pending artist applications from WeaveDB
      const pendingApplications = await db.getPendingArtistApplications();
      return pendingApplications;
    } catch (error) {
      throw new Error(`Error fetching pending artist applications: ${error.message}`);
    }
  },
  async approveArtist(userId) {
    try {
      // Update the user's role to "artist" in WeaveDB
      await db.updateUserRole(userId, "artist");
    } catch (error) {
      throw new Error(`Error approving artist: ${error.message}`);
    }
 },
};

module.exports = artistService;
