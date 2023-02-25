import  { Firestore, firebase, FieldValue} from '../lib/firebase';
import 'firebase/firestore';

export async function doesUsernameExist(username){
    const result = await 
        firebase.firestore()  // go to the firestore database
        .collection('users') // go to the user collection
        .where('username', '==' , username.toLowerCase()) // predicate // and special syntax of firebase
        .get(); //get the result

    
    return result.docs.length >0;
}
 
export async function getUserByUsername(username){
    const result = await 
    firebase.firestore()  
    .collection('users') 
    .where('username', '==' , username) 
    .get(); 

    const user= result.docs.map((item)=>({
        ...item.data(),
        docId : item.id
    }));

    return user
}

export async function getUserByUserId(userId){
    const result = await 
    firebase.firestore()  
    .collection('users') 
    .where('userId', '==' , userId) 
    .get(); 

    const user= result.docs.map((item)=>({
        ...item.data(),
        docId : item.id
    }));
    return user
}

export async function getSuggestedProfiles(userId,following){
    const result = await 
    firebase.firestore()  
    .collection('users') 
    .limit(10) // limit the number of result
    .get(); 
    const profile = result.docs.map((user)=>({
        ...user.data(),
        docId : user.id})).filter((profile)=>(profile.userId !== userId && !following.includes(profile.userId)))
    return profile
}

export async function updateFollowing(loggedInUserDocId,profileId,isFollowingProfile){
    return await 
    firebase.firestore()  
    .collection('users') 
    .doc(loggedInUserDocId)  
    .update({
        following : isFollowingProfile? FieldValue.arrayRemove(profileId) : FieldValue.arrayUnion(profileId)
    }); 
}

export async function updateFollowers(profileDocId,userId,isFollowingProfile){
    return await 
    firebase.firestore()  
    .collection('users') 
    .doc(profileDocId)  
    .update({
        following : isFollowingProfile? FieldValue.arrayRemove(userId) : FieldValue.arrayUnion(userId)
    }); 
}

export async function getPhotos(userId, following){
    const result = await 
    firebase.firestore()  
    .collection('photos') 
    .where('userId','in', following)
    .get();
    const followedUserPhotos = result.docs.map((photo)=>({
        ...photo.data(),
        docId : photo.id
    }));
    
    const photosWithUserDetails = await Promise.all(
        followedUserPhotos.map(async (photo)=>{
            let userLikePhoto = false;
            if(photo.likes.includes(userId)){
                userLikePhoto = true
            }
            const user = await getUserByUserId(photo.userId);
            const{username} = user[0];
            return {username, ...photo,userLikePhoto};
        })
    )
    
    return photosWithUserDetails;
}

export async function getUserPhotosByUserId(userId){
    const result = await 
    firebase.firestore()  
    .collection('photos') 
    .where('userId', '==' , userId)
    .get();
    const photos = result.docs.map((photo)=>({
        ...photo.data(),
        docId : photo.id
    }));
    

    return photos
}

export async function isUserFollowingProfile(username,profileUserId){
    const result = await 
    firebase.firestore()  
    .collection('users') 
    .where('username', '==' , username)
    .where('following', 'array-contains' , `${profileUserId}`)
    .get();

    const [datas={}] = result.docs.map((data)=>({
        ...data.data(),
        docId : data.id
    }));
    return datas.userId
}


export async function toggleFollow(
    isFollowingProfile,
    activeUserDocId,
    profileDocId,
    profileUserId,
    followingUserId
  ) {
    // 1st param: karl's doc id
    // 2nd param: raphael's user id
    // 3rd param: is the user following this profile? e.g. does karl follow raphael? (true/false)
    await updateFollowing(activeUserDocId, profileUserId, isFollowingProfile);
  
    // 1st param: karl's user id
    // 2nd param: raphael's doc id
    // 3rd param: is the user following this profile? e.g. does karl follow raphael? (true/false)
    await updateFollowers(profileDocId, followingUserId, isFollowingProfile);
  }