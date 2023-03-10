import { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import Skeleton from 'react-loading-skeleton';
import useUser from '../../hooks/useUser';
import { getUserByUserId, isUserFollowingProfile, toggleFollow } from '../../services/firebase';
import UserContext from '../../context/user';
import { DEFAULT_IMAGE_PATH } from '../../constants/paths';


const Header = ({
    photosCount,
    followerCount,
    setFollowerCount,
    
    profile: {
      docId: profileDocId,
      userId: profileUserId,
      fullName,
      followers,
      following,
      username: profileUsername
  }}) => {
    
    const { user} = useContext(UserContext);

    const [isFollowingProfile,setIsFollowingProfile] = useState(null)

	const activeBtnFollow = user?.displayName && user?.displayName !== profileUsername;

    useEffect(()=>{
		const isLoggedInUserFollowing = async ()=>{
			const [loggedUser] = await getUserByUserId(user?.uid)
			const isFollowing = await isUserFollowingProfile(loggedUser.username,profileUserId)
			setIsFollowingProfile(isFollowing)
		}
		if (user?.displayName && profileUserId) {
			isLoggedInUserFollowing();
		}
		}, [profileUserId,user.username,user.uid]);
    


    const handleToggleFollow = async () => {
		const [loggedUser] = await getUserByUserId(user?.uid)
		setIsFollowingProfile((isFollowingProfile) => !isFollowingProfile);
		setFollowerCount({
			followerCount: isFollowingProfile ? followerCount - 1 : followerCount + 1
		});

		await toggleFollow(isFollowingProfile, loggedUser.docId, profileDocId, profileUserId, loggedUser.userId);
    };
    




    return (
      <div className='grid grid-col-3 gap-4 justify-between mx-auto max-w-screen-lg'>
        <div className='container flex justify-center' >
          {profileUserId?(
            <img className='rounded-full h-40 w-40 flex' src={`../images/avatars/${profileUsername}.jpg`}  alt={profileUsername}  /> ):
            (
              <Skeleton circle height={150} width={150} count={1} />
            )}
          </div>
          <div className="flex items-center justify-center flex-col col-span-2">
            <div className="container flex items-center">
              <p className="text-2xl mr-4">{profileUsername}</p>
              {activeBtnFollow && isFollowingProfile === null ? (
                <Skeleton count={1} width={80} height={32} />
              ) : (
                activeBtnFollow && (
                  <button
                    className="bg-blue-medium font-bold text-sm rounded text-white w-20 h-8"
                    type="button"
                    onClick={handleToggleFollow}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter') {
                        handleToggleFollow();
                      }
                    }}
                  >
                    {isFollowingProfile ? 'Unfollow' : 'Follow'}
                  </button>
                )
              )}
            </div>
            <div className="container flex mt-4">
              {!followers || !following ? (
                <Skeleton count={1} width={677} height={24} />
              ) : (
                <>
                  <p className="mr-10">
                    <span className="font-bold">{photosCount}</span> photos
                  </p>
                  <p className="mr-10">
                    <span className="font-bold">{followerCount}</span>
                    {` `}
                    {followerCount === 1 ? `follower` : `followers`}
                  </p>
                  <p className="mr-10">
                    <span className="font-bold">{following?.length}</span> following
                  </p>
                </>
              )}
            </div>
            <div className="container mt-4">
              <p className="font-medium">{!fullName ? <Skeleton count={1} height={24} /> : fullName}</p>
            </div>
          </div>
        </div>

    )
}

export default Header