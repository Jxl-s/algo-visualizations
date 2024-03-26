import PageLayout from "../layouts/PageLayout";

export default function IndexPage() {
    return (
        <PageLayout>
            <h1 className="text-2xl font-semibold">Algorithm Visualizations</h1>
            <p>
                This website is a collection of visualizations of various
                algorithms. Each visualization is interactive and allows you to
                see how the algorithm works in real-time.
            </p>
        </PageLayout>
    );
}
