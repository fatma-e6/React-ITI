import { Card, CardContent } from "@/components/ui/card";

function UserCard({ user }) {
  return (
    <Card className="text-center bg-card border border-border hover:border-yellow-600/50 hover:shadow-xl hover:shadow-yellow-900/10 transition-all duration-300 overflow-hidden">
      <div
        className="h-1 w-full"
        style={{
          background:
            user.role === "admin"
              ? "#ef4444"
              : user.role === "moderator"
                ? "#eab308"
                : "#22c55e",
        }}
      ></div>
      <CardContent className="flex flex-col items-center gap-3 pt-6 pb-6">
        <img
          src={user.picture}
          alt={user.username}
          className="rounded-full w-24 h-24 object-cover ring-2 ring-border"
        />
        {user.role === "admin" && (
          <span className="text-xs px-3 py-1 rounded-full font-semibold bg-red-500/10 text-red-400 border border-red-500/20">
            admin
          </span>
        )}
        {user.role === "moderator" && (
          <span className="text-xs px-3 py-1 rounded-full font-semibold bg-yellow-500/10 text-yellow-400 border border-yellow-500/20">
            moderator
          </span>
        )}
        {user.role === "user" && (
          <span className="text-xs px-3 py-1 rounded-full font-semibold bg-green-500/10 text-green-400 border border-green-500/20">
            user
          </span>
        )}
        <p className="font-bold text-card-foreground text-lg">{user.username}</p>
        <div className="text-xs text-muted-foreground flex flex-col gap-1.5 w-full px-2">
          <p className="flex items-center justify-center gap-1">📧 {user.email}</p>
          <p className="flex items-center justify-center gap-1">📱 {user.phone}</p>
          <p className="flex items-center justify-center gap-1">🎂 {user.birthdate}</p>
        </div>
      </CardContent>
    </Card>
  );
}

export default UserCard;