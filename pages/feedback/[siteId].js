import FeedbackTableSkeleton from '@/components/FeedbackTableSkeleton';
import DashboardShell from '@/components/DashboardShell';
import useSWR from 'swr';
import fetcher from '@/utils/fetcher';
import FeedbackTable from '@/components/FeedbackTable';
import {useUserContext} from '@/lib/auth';
import Page from '@/components/Page';
import SiteFeedbackTableHeader from '@/components/SiteFeedbackTableHeader';
import FeedbackEmptyState from '@/components/FeedbackEmptyState';
import {useRouter} from 'next/router';
const SiteFeedback = () => {
    const {user} = useUserContext();
    const {query} = useRouter();
    const {data} = useSWR(user ? [`/api/feedback/${query.siteId}`, user.accessToken] : null, fetcher);
    if (!data) {
        return (
            <DashboardShell>
                <SiteFeedbackTableHeader />
                <FeedbackTableSkeleton />
            </DashboardShell>
        );
    }
    return (
        <DashboardShell>
            <SiteFeedbackTableHeader siteName={data.site.name} />
            {data?.feedback?.length ? <FeedbackTable allFeedback={data.feedback} /> : <FeedbackEmptyState />}
        </DashboardShell>
    );
};

const SiteFeedbackPage = () => (
    <Page name="Name of site Feedback" path="/feedback">
        <SiteFeedback />
    </Page>
);

export default SiteFeedbackPage;
