import { useSelector } from "react-redux";
import ViewTransactions from "../../components/viewTransactions/viewTransactions";
import EditName from "../../components/EditName/EditName";
const User = () => {
  const user = useSelector((state) => state.auth.profile);

  return (
    <main className=" container_User main bg-dark">
      <div className="content_HeaderUser">
        <h1>
          Welcome back
          <br />
          {user?.userName}!
        </h1>
        <EditName />
      </div>
      <h2 className="sr-only"></h2>
      <ViewTransactions
        title="Argent Bank Checking (x8349)"
        balance="$2,082.79"
        availableBalance="Available Balance"
      />
      <ViewTransactions
        title="Argent Bank Saving (x6712)"
        balance="$10,928.42"
        availableBalance="Available Balance"
      />
      <ViewTransactions
        title="Argent Bank Card (x8349)"
        balance="$184.30"
        availableBalance="Current Balance"
      />
    </main>
  );
};

export default User;
