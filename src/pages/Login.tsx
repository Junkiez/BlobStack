import {SignInButton} from "@clerk/clerk-react";
import {Button, Card, Metric, Text} from "@tremor/react";
import Main from "../components/Main.tsx";

export default function Login() {
    return (
        <Main>
            <Card className="w-64 md:w-96 flex flex-col items-center justify-center gap-2 mx-auto">
                <Metric>Sign In</Metric>
                <Text>Your own protected files storage</Text>
                <Button className="w-full">
                    <SignInButton/>
                </Button>
            </Card>
        </Main>
    )
}
