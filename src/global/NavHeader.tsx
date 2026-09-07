import { NavLink, useNavigate } from "react-router-dom";
import DsButton from "../design-system/DsButton";
import { useEffect } from "react";
import { LogOutIcon, LucideUser2, LoaderCircle } from "lucide-react";
import { DUMMY_BASE_URL } from "../Contstans";
import { useAuthStore } from "../Stores/Auth.store";

const links = [
  { title: "Home", link: "/app/home" },
  { title: "Posts", link: "/app/posts" },
  { title: "About Us", link: "/app/about-Us" },
  { title: "Contact Us", link: "/app/contact-Us" },
  { title: "Profile", link: "/app/profile" },
  { title: "Counter", link: "/app/counter" },
];

function NavHeader() {
  const navigate = useNavigate();
  const {user, setUser} = useAuthStore();

  const loginApi = async () => {
    const res = await fetch(`${DUMMY_BASE_URL}/auth/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`, // Pass JWT via Authorization header
      },
    });
    const data = await res.json();
    if (res.ok) {
      return data;
    } else {
      return Promise.reject(data.message);
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await loginApi();
        setUser(data);
      } catch (error) {
        console.log("Token validation failed:", error);
        handleLogout(); 
      }
    };
    if (!sessionStorage.getItem("token")) {
      console.log("useEffect is run");
      sessionStorage.removeItem("token");
      navigate("/login");
      return;
    } else {
      fetchUserData();
    }
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    navigate("/login");
  };

  const gotoProfile = () => {
    navigate("/app/profile");
  };
  if (!user) {
    return (
      <div className="flex w-64 min-h-screen flex-col items-center justify-center border-r border-slate-700 bg-slate-800">
        <div className="flex flex-col items-center gap-4">
          {/* دایره پس‌زمینه با افکت نئونی ملایم */}
          <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-slate-700/30 shadow-[0_0_15px_rgba(59,130,246,0.2)]">
            {/* افکت موج‌دار (Ping) در پس‌زمینه آیکون */}
            <div className="absolute inset-0 rounded-full border-2 border-blue-500/30 animate-ping"></div>

            {/* آیکون در حال چرخش */}
            <LoaderCircle className="h-8 w-8 animate-spin text-blue-500" />
          </div>

          {/* متن در حال چشمک زدن (Pulse) */}
          <span className="animate-pulse text-sm font-medium tracking-wider text-slate-300">
           Loading ...
          </span>
        </div>
      </div>
    );
  }
  return (
    <>
      <div className="flex flex-col justify-center">
        <nav className="w-64 min-h-screen bg-slate-800 border-r border-slate-700 p-4">
          <div className="text-white text-2xl font-bold text-center mb-8 pb-4  flex flex-col justify-around">
            My Dashboard
            <div className="min-h-30 flex flex-col gap-2">
              <div className="flex gap-2 items-center text-white mt-5 mb-2">
                <LucideUser2 className="cursor-pointer" onClick={gotoProfile} />
                <span className="cursor-pointer" onClick={gotoProfile}>
                  {user?.firstName + " " + user?.lastName}
                </span>
              </div>
              <DsButton
                icon={<LogOutIcon />}
                text="log out"
                color="red"
                className="<p-4 w-25"
                onClick={handleLogout}
              />
            </div>
          </div>

          <ul className="flex flex-col gap-2">
            {links.map((item, index) => {
              return (
                <li key={index}>
                  <NavLink
                    to={item.link}
                    className={({ isActive }) =>
                      `block px-4 py-3 rounded-lg transition-all duration-300 text-lg ${
                        isActive
                          ? "bg-blue-600 text-white shadow-md"
                          : "text-gray-300 hover:bg-slate-700 hover:text-white"
                      }`
                    }
                  >
                    {item.title}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </>
  );
}

export default NavHeader;
