import NavigationBar from './Header';

interface LayoutProps {
    children: React.ReactNode;
}

const MainLayout = ({ children }: LayoutProps) => {
    return (
        <div className="min-h-screen theme-background transition-colors duration-300">
            <NavigationBar />
            <main className="pb-12">{children}</main>
        </div>
    );
};

export default MainLayout;

