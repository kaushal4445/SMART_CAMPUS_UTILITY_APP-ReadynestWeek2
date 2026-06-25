import { useEffect } from "react";
import { supabase } from "../config/supabase";

function TestSupabase() {
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const { data, error } = await supabase
      .from("goals")
      .select("*");

    console.log(data);

    if (error) {
      console.log(error);
    }
  };

  return (
    <div>
      Supabase Connected Successfully 🚀
    </div>
  );
}

export default TestSupabase;