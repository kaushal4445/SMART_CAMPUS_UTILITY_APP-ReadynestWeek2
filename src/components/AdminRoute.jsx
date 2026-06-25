import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../config/supabase";

function AdminRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    checkAdmin();
  }, []);

  async function checkAdmin() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setLoading(false);
      return;
    }

async function checkAdmin() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  console.log("Current User:", user);

  if (!user) {
    setLoading(false);
    return;
  }

  const { data, error } = await supabase
    .from("admins")
    .select("*")
    .eq("user_id", user.id);

  console.log("Admin Query Result:", data);
  console.log("Admin Query Error:", error);

  if (data && data.length > 0) {
    setIsAdmin(true);
  }

  setLoading(false);
}

    const { data } = await supabase
      .from("admins")
      .select("*")
      .eq("user_id", user.id)
      .single();

    if (data) {
      setIsAdmin(true);
    }

    setLoading(false);
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return isAdmin ? children : <Navigate to="/dashboard" />;
}

export default AdminRoute;