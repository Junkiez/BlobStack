import './index.css'
import {ClerkProvider, SignedIn, SignedOut} from '@clerk/clerk-react'
import React from 'react'
import ReactDOM from 'react-dom/client'
import {
    Outlet,
    RouterProvider,
    createRouter,
    createRoute,
    createRootRoute,
} from '@tanstack/react-router'
import Login from "./pages/Login.tsx";
import Photo from "./pages/Photo.tsx";
import Video from "./pages/Video.tsx";
import Docs from "./pages/Docs.tsx";
import Home from "./pages/Home.tsx";
import Navigation from "./components/Navigation.tsx";
import Music from "./pages/Music.tsx";
import Main from "./components/Main.tsx";
import VARS from "./lib/env/vars.ts";

const rootRoute = createRootRoute({
    component: () => (
        <Main>
            <Navigation/>
            <Outlet/>
        </Main>
    ),
})

const routeTree = rootRoute.addChildren([
    createRoute({
        getParentRoute: () => rootRoute,
        path: '/',
        component: Home
    }),
    createRoute({
        getParentRoute: () => rootRoute,
        path: '/photo',
        component: Photo
    }),
    createRoute({
        getParentRoute: () => rootRoute,
        path: '/video',
        component: Video
    }),
    createRoute({
        getParentRoute: () => rootRoute,
        path: '/music',
        component: Music
    }),
    createRoute({
        getParentRoute: () => rootRoute,
        path: '/docs',
        component: Docs
    })
])

const router = createRouter({routeTree})

declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router
    }
}

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ClerkProvider publishableKey={VARS.PUBLISHABLE_KEY}>
            <SignedOut>
                <Login/>
            </SignedOut>
            <SignedIn>
                <RouterProvider router={router}/>
            </SignedIn>
        </ClerkProvider>
    </React.StrictMode>,
)
