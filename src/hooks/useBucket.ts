import {useEffect} from "react";
import {useUser} from "@clerk/clerk-react";
import supabase from "../lib/supabase/supabase.ts";

export default function useBucket(updateData: ()=>Promise<void>) {
    const {user} = useUser();
    
    useEffect(()=> {
            (async () => {
                if (user?.id) {
                    if (sessionStorage.getItem('bucket') !== user?.id) {
                        const buckets = await supabase.storage.listBuckets();
                        const myBucket = buckets.data?.filter(b => b.id === user?.id)
                        if (myBucket?.length === 1) {
                            sessionStorage.setItem('bucket', myBucket[0].id);
                        } else {
                            await supabase.storage.createBucket(user?.id, {
                                public: false
                            });
                            sessionStorage.setItem('bucket', user?.id);
                        }
                    }
                    await updateData();
                }
            }
        )()
    },[updateData, user?.id])
    
    return [user]
}
