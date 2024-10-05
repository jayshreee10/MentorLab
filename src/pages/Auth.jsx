import CommonForm from "@/components/common-form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { signInFormControls, signUpFormControls } from "@/config"; // Ensure this import path is correct
import { AuthContext } from "@/context/auth-context"; // Ensure this path is correct
import { useContext } from "react";
import { FaUserGraduate } from "react-icons/fa6";
import { GrGoogle } from "react-icons/gr";

function AuthPageUI() {
  // Access context values directly
  const {
    activeTab,
    setActiveTab,
    signInFormData,
    signUpFormData,
    setSignInFormData,
    setSignUpFormData,
    handleLoginUser,
    handleRegisterUser,
  } = useContext(AuthContext);

  function handleTabChange(value) {
    setActiveTab(value);
  }

  function checkIfSignInFormIsValid() {
    return (
      signInFormData &&
      signInFormData.userEmail !== "" &&
      signInFormData.password !== ""
    );
  }

  function checkIfSignUpFormIsValid() {
    return (
      signUpFormData &&
      signUpFormData.userName !== "" &&
      signUpFormData.userEmail !== "" &&
      signUpFormData.password !== "" &&
      signUpFormData.role !== ""
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="px-4 lg:px-6 h-14 flex items-center border-b gap-4">
        <FaUserGraduate size={20} />
        <h1 className="text-xl font-bold">Mentor Lab</h1>
      </header>

      {/* Main Content */}
      <div className="flex items-center justify-center min-h-screen bg-background">
        <Tabs
          value={activeTab}
          onValueChange={handleTabChange}
          className="w-full max-w-md"
        >
          {/* Tabs List */}
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="signin">Sign In</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>

          {/* Sign In Tab */}
          <TabsContent value="signin">
            <Card className="p-6 space-y-4">
              <CardHeader>
                <CardTitle>Sign in to your account</CardTitle>
                <CardDescription>
                  Enter your email and password to access your account
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <CommonForm
                  formControls={signInFormControls}
                  buttonText={"Sign In"}
                  formData={signInFormData}
                  setFormData={setSignInFormData}
                  isButtonDisabled={!checkIfSignInFormIsValid()}
                  handleSubmit={() => {}}
                />
                <Button className="w-full">
                  <GrGoogle />
                  <div className="pl-2">Sign up with Google</div>
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Sign Up Tab */}
          <TabsContent value="signup">
            <Card className="p-6 space-y-4">
              <CardHeader>
                <CardTitle>Create a new account</CardTitle>
                <CardDescription>
                  Enter your details to get started
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <CommonForm
                  formControls={signUpFormControls}
                  buttonText={"Sign Up"}
                  formData={signUpFormData}
                  setFormData={setSignUpFormData}
                  isButtonDisabled={!checkIfSignUpFormIsValid()}
                  handleSubmit={handleRegisterUser}
                />
                <Button className="w-full">
                  <GrGoogle />
                  <div className="pl-2">Sign up with Google</div>
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default AuthPageUI;
