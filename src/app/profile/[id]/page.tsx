export default function userProfile({params}:any){
    return (
        <div className="flex flex-col items-center justify-center max-h-screen py-2">
            <h1>Profile</h1>

            <p className="text-2xl">{params.id}</p>
        </div>
    )
}