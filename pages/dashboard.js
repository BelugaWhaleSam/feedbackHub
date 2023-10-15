import EmptyState from '@/components/EmptyState';
import SiteTableSkeleton from '@/components/SiteTableSkeleton';
import DashboardShell from '@/components/DashboardShell';
import useSWR from 'swr';
import fetcher from '@/utils/fetcher';
import SiteTable from '@/components/SiteTable';
import {useUserContext} from '@/lib/auth';
import SiteTableHeader from '@/components/SiteTableHeader';

export default function Dashboard() {
    const {user} = useUserContext();
    const {data} = useSWR(user ? ['/api/sites', user.accessToken] : null, fetcher);
    // const { data } = useSWR(['/api/sites', user.accessToken], ([url, token]) => fetcher(url, token))
    if (!data) {
        return (
            <DashboardShell>
                <SiteTableHeader />
                <SiteTableSkeleton />
            </DashboardShell>
        );
    }
    return (
        <DashboardShell>
            <SiteTableHeader />
            {data.sites ? <SiteTable sites={data.sites} /> : <EmptyState />}
        </DashboardShell>
    );
}
