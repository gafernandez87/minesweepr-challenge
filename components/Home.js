import { useRouter } from 'next/router';

const Home = () => {
    const router = useRouter();

    const handleSinglePlayer = () => {
        router.push('/dashboard');
    };

    return (
        <>
            <button onClick={handleSinglePlayer}>SINGLE PLAYER</button>
            <button>MULTIPLAYER</button>
        </>
    );
};

export default Home;
