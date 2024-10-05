import React, { useContext } from "react"; // Import React and useContext
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CommonForm from "@/components/common-form";
import { signInFormControls, signUpFormControls } from "@/config"; // Ensure this import path is correct
// import { AuthContext } from "@/context/auth-context"; // Ensure this path is correct

function AuthPageUI() {
  // Access context values directly
  // const {
  //   activeTab,
  //   setActiveTab,
  //   signInFormData,
  //   signUpFormData,
  //   setSignInFormData,
  //   setSignUpFormData,
  //   handleLoginUser,
  //   handleRegisterUser,
  // } = useContext(AuthContext);

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
      signUpFormData.password !== ""
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="px-4 lg:px-6 h-14 flex items-center border-b">
        <h1 className="text-xl font-bold">Auth Page</h1>
      </header>

      {/* Main Content */}
      <div className="flex items-center justify-center min-h-screen bg-background">
        <Tabs
          // value={activeTab}
          // onValueChange={handleTabChange}
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
                  // formControls={signInFormControls}
                  buttonText={"Sign In"}
                  // formData={signInFormData}
                  // setFormData={setSignInFormData}
                  // isButtonDisabled={!checkIfSignInFormIsValid()}
                  // handleSubmit={handleLoginUser}
                />
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
                  // formControls={signUpFormControls}
                  buttonText={"Sign Up"}
                  // formData={signUpFormData}
                  // setFormData={setSignUpFormData}
                  // isButtonDisabled={!checkIfSignUpFormIsValid()}
                  // handleSubmit={handleRegisterUser}
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default AuthPageUI;
