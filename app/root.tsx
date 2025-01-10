import {
    Links,
    Meta,
    MetaFunction,
    Outlet,
    Scripts,
    ScrollRestoration,
} from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";
import { Analytics } from "@vercel/analytics/remix";

import "./tailwind.css";
import Background from "./components/scene/Scene";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { SceneProvider } from "./providers/SceneProvider";

export const meta: MetaFunction = () => {
    return [
        { title: "Danil Pankrashkin | Portfolio" },
        { charset: "utf-8" },
        { viewport: "width=device-width,initial-scale=1" },
    ];
};

export const links: LinksFunction = () => [
    { rel: "preconnect", href: "https://fonts.googleapis.com" },
    {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
    },
    {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
    },
];

export function Layout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <head>
                <meta charSet="utf-8" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <Meta />
                <Links />
            </head>
            <body className="font-inter">
                <SceneProvider>
                    <Background />
                    <div className="md:p-8 p-2 min-h-screen flex flex-col z-10">
                        <div className="p-4 border border-white rounded-3xl flex-1 z-10 flex flex-col gap-8">
                            <Header />
                            {children}
                            <Footer />
                        </div>
                    </div>
                </SceneProvider>
                <ScrollRestoration />
                <Scripts />
                <Analytics />
            </body>
        </html>
    );
}

export default function App() {
    return <Outlet />;
}
