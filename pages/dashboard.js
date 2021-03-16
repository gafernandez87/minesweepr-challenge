// NextJS
import Head from 'next/head';

// Components
import Dashboard from 'components/Dashboard/Dashboard';

const DashboardPage = () => {
    return (
        <>
            <Head>
                <title>Minesweeper | Dashboard</title>
            </Head>
            <Dashboard />
        </>);
};

export default DashboardPage;
