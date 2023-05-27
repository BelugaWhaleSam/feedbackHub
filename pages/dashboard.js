import {useUserContext} from '@/lib/auth';
import EmptyState from '@/components/EmptyState';
import SiteTableSkeleton from '@/components/SiteTableSkeleton';
import DashboardShell from '@/components/DashboardShell';

export default function Dashboard() {
    const {user} = useUserContext();

    if (!user) {
        return (
            <DashboardShell>
                <SiteTableSkeleton />
            </DashboardShell>
        );
    }

    return (
        <DashboardShell>
            <EmptyState />
        </DashboardShell>
    );
}
