import EmptyState from '@/components/EmptyState';
import FeedbackTableSkeleton from '@/components/FeedbackTableSkeleton';
import DashboardShell from '@/components/DashboardShell';
import useSWR from 'swr';
import fetcher from '@/utils/fetcher';
import FeedbackTable from '@/components/FeedbackTable';
import {useUserContext} from '@/lib/auth';
import FeedbackTableHeader from '@/components/FeedbackTableHeader';

export default function MyFeedback() {
    const {user} = useUserContext();
    const {data} = useSWR(user ? ['/api/feedback', user.accessToken] : null, fetcher);
    // const { data } = useSWR(['/api/sites', user.accessToken], ([url, token]) => fetcher(url, token))
    if (!data) {
        return (
            <DashboardShell>
                <FeedbackTableHeader />
                <FeedbackTableSkeleton />
            </DashboardShell>
        );
    }
    console.log(data);
    return (
        <DashboardShell>
            <FeedbackTableHeader />
            {data.feedback ? <FeedbackTable allFeedback={data.feedback} /> : <EmptyState />}
        </DashboardShell>
    );
}
