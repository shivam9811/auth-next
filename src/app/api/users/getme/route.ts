import { getDataFromToken } from "@/helpers/getDataFromToken";

import { NextRequest,NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";

export async function GET(req:NextRequest){
  try{
    connect();
    const id=await getDataFromToken(req);
    const user=await User.findOne({_id:id}).select('-password');
    return NextResponse.json({user,success:true,message:"user data fetched successfully"})

  }catch(error:any){
    return NextResponse.json({error:error.message},{status:400})
  }
}