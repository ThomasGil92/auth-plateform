"use client"
import { admin } from "@/actions/admin";
import { RoleGate } from "@/components/auth/role-gate";
import { FormSuccess } from "@/components/form-success.tsx";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { currentRole } from "@/lib/auth";
import { UserRole } from "@prisma/client";
import { toast } from "sonner";

const AdminPage = () => {
const onServerActionClick=()=>{
    admin().then((res)=>{
        if(res.success){
            toast.success("Allowed server action")
        }else{
            toast.error("FORBIDDEN server action")
        }
    })
}

  const onApiRouteClick = () => {
    
    fetch("/api/admin").then((res) => {
      if (res.ok) {
        toast.success("Allowed API route")
      } else {
        toast.error("FORBIDDEN API Route");
      }
    });
  };

  return (
    <Card className='w-[600px]'>
      <CardHeader>
        <p className='text-2xl font-semibold text-center'>Admin</p>
      </CardHeader>
      <CardContent className='space-y-4'>
        {" "}
        <RoleGate allowedRole={UserRole.ADMIN}>
          <FormSuccess message='You are allowed to access this page' />
        </RoleGate>
        <div className='flex flex-row items-center justify-between rounded-lg border shadow-sm p-3'>
          <p className='text-sm font-medium'>Admin-only API Route</p>
          <Button onClick={() => onApiRouteClick()}>Click to test</Button>
        </div>
        <div className='flex flex-row items-center justify-between rounded-lg border shadow-sm p-3'>
          <p className='text-sm font-medium'>Admin-only API Route</p>
          <Button onClick={onServerActionClick}>
            Admin-only Server Action
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
export default AdminPage;
