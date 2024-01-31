import {Icon, Text} from "@tremor/react";
import {SignOutButton, useUser} from "@clerk/clerk-react";
import {LogoutIcon} from "@heroicons/react/outline";

export default function User() {
    const {isLoaded, user} = useUser();

    return isLoaded ?
        (
            <div className="flex items-center gap-2">
                <Text className="text-xl">
                    {user?.fullName}
                </Text>
                <img src={user?.imageUrl} className="h-10 rounded-lg"
                     alt="BlobStack Logo"/>
                <SignOutButton>
                    <div
                        className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                        <Icon icon={LogoutIcon}/>
                    </div>
                </SignOutButton>
            </div>
        ) : <></>
}
