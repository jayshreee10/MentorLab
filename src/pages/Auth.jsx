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
import { useApiContext } from "@/context/firebase-context";
import { useContext } from "react";
import { GrGoogle } from "react-icons/gr";
import logo from "../assets/Girl.png";

function AuthPageUI() {
  const {
    activeTab,
    setActiveTab,
    signInFormData,
    signUpFormData,
    setSignInFormData,
    setSignUpFormData,
  } = useContext(AuthContext);

  const {
    signUpWithGoogle,
    signInWithGoogle,
    signUpWithEmailPassword,
    signInWithEmailPassword,
  } = useApiContext();
  // Access context values directly

  function handleTabChange(value) {
    setActiveTab(value);
  }

  // Validation for Sign-In Form
  function checkIfSignInFormIsValid() {
    if (
      signInFormData &&
      typeof signInFormData.userEmail === "string" &&
      typeof signInFormData.password === "string" &&
      signInFormData.userEmail.trim() !== "" &&
      signInFormData.password.trim() !== ""
    ) {
      if (!validateEmail(signInFormData.userEmail)) {
        // alert("Email is not valid!"); // Show alert if email is not valid
        return false;
      }
      return true;
    } else {
      return false; // Return false if other conditions are not met
    }
  }

  // Validation for Sign-Up Form
  function checkIfSignUpFormIsValid() {
    if (
      signUpFormData &&
      typeof signUpFormData.userName === "string" &&
      typeof signUpFormData.userEmail === "string" &&
      typeof signUpFormData.password === "string" &&
      typeof signUpFormData.role === "string" &&
      signUpFormData.userName.trim() !== "" &&
      signUpFormData.userEmail.trim() !== "" &&
      signUpFormData.password.trim() !== "" &&
      signUpFormData.role.trim() !== ""
    ) {
      if (!validateEmail(signUpFormData.userEmail)) {
        // alert("Email is not valid!");
        return false;
      }
      return true;
    } else {
      return false; // Return false if other conditions are not met
    }
  }

  // Email validation utility function
  function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  return (
    <div className="flex flex-col items-center justify-center bg-white rounded-lg p-10 shadow-lg">
      <header className="px-4 lg:px-6 h-14 flex items-baseline justify-center  pb-5 gap-4">
        <img src={logo} alt="" srcSet="" className="size-[40px]" />
        <p className="text-4xl font-bold">Mentor Lab</p>
      </header>
      <Tabs
        value={activeTab}
        onValueChange={handleTabChange}
        className="w-[500px]"
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
                handleSubmit={(event) => {
                  event.preventDefault();
                  signInWithEmailPassword(
                    signInFormData.userEmail,
                    signInFormData.password
                  );
                }}
              />
              <Button
                className="w-full"
                onClick={() => {
                  signInWithGoogle();
                }}
              >
                <GrGoogle />
                <div className="pl-2 font-medium">Sign in with Google</div>
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
                <p className="py-2">Enter your details to get started</p>
                <p>Select a Role to Signup with Google</p>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <CommonForm
                formControls={signUpFormControls}
                buttonText={"Sign Up"}
                formData={signUpFormData}
                setFormData={setSignUpFormData}
                isButtonDisabled={!checkIfSignUpFormIsValid()}
                handleSubmit={(event) => {
                  event.preventDefault();
                  signUpWithEmailPassword(
                    signUpFormData.userEmail,
                    signUpFormData.password,
                    signUpFormData.userName,
                    signUpFormData.role
                  );
                }}
              />
              <Button
                className="w-full"
                disabled={signUpFormData.role == ""}
                onClick={() => {
                  signUpWithGoogle(signUpFormData.role);
                }}
              >
                <GrGoogle />
                <div className="pl-2 font-medium">Sign up with Google</div>
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default AuthPageUI;
