import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import useInput from "../../../hooks/useInput";
import { asyncLoginUser } from "../states/action";

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector((state) => state.auth.isLogin);
  const [email, onEmailChange] = useInput("");
  const [password, onPasswordChange] = useInput("");

  async function handleSubmit(event) {
    event.preventDefault();
    const success = await dispatch(asyncLoginUser({ email, password }));
    if (success) navigate("/", { replace: true });
  }

  return (
    <div>
      <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">Selamat datang kembali</h1>
      <p className="text-sm text-slate-500 mb-5">Masuk untuk mengelola laporan barangmu.</p>

      <form onSubmit={handleSubmit} className="space-y-4" data-testid="login-form">
        <div>
          <label htmlFor="login-email" className="block text-sm font-semibold text-slate-700 mb-1.5">
            Email
          </label>
          <input
            id="login-email"
            type="email"
            required
            value={email}
            onChange={onEmailChange}
            className="input-base"
          />
        </div>
        <div>
          <label htmlFor="login-password" className="block text-sm font-semibold text-slate-700 mb-1.5">
            Kata Sandi
          </label>
          <input
            id="login-password"
            type="password"
            required
            value={password}
            onChange={onPasswordChange}
            className="input-base"
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="btn-primary w-full py-3"
        >
          {isLoading ? "Memproses..." : "Masuk Sekarang"}
        </button>
      </form>

      <p className="text-sm text-slate-500 mt-5 text-center">
        Belum punya akun?{" "}
        <Link to="/auth/register" className="text-indigo-600 font-semibold hover:underline">
          Daftar
        </Link>
      </p>
    </div>
  );
}
