import { auth, currentUser } from "@clerk/nextjs/server";

export default async function ProfilePage() {
  const { userId } = await auth();
  const user = await currentUser();

  if (!userId || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Not Authenticated</h1>
          <p>Please sign in to view your profile.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <div className="flex items-center space-x-6 mb-8">
          <img
            src={user.imageUrl}
            alt="Profile"
            className="w-24 h-24 rounded-full border-4 border-blue-100"
          />
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {user.firstName} {user.lastName}
            </h1>
            <p className="text-gray-600 mt-1">
              {user.emailAddresses[0]?.emailAddress}
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Member since {new Date(user.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-semibold mb-4">Account Details</h2>
            <div className="space-y-3">
              <div>
                <span className="text-gray-500 text-sm">Username</span>
                <p className="font-medium">{user.username || "Not set"}</p>
              </div>
              <div>
                <span className="text-gray-500 text-sm">Phone</span>
                <p className="font-medium">
                  {user.phoneNumbers[0]?.phoneNumber || "Not set"}
                </p>
              </div>
              <div>
                <span className="text-gray-500 text-sm">User ID</span>
                <p className="font-mono text-sm">{userId}</p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Additional Information</h2>
            <div className="space-y-3">
              {Object.entries(user.publicMetadata).length > 0 ? (
                Object.entries(user.publicMetadata).map(([key, value]) => (
                  <div key={key}>
                    <span className="text-gray-500 text-sm capitalize">
                      {key.replace(/_/g, ' ')}
                    </span>
                    <p className="font-medium">{value as string}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No additional information</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}