import {useUserContext} from '@/lib/auth';
import EmptyState from '@/components/EmptyState';

export default function Dashboard() {
    const {user} = useUserContext();

    if(!user) {
        return 'loading...'
    }

    return (
        <EmptyState/>
    );
}
