import { useState } from "react";

function App() {
  const [form, setForm] = useState({
    age: "",
    sex: "",
    cp: "",
    trestbps: "",
    chol: "",
    thalach: "",
    oldpeak: "",
    ca: "",
    thal: "",
    exang: "",
    slope: "",
  });

  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      setResult(
        `${data.result} • ${(data.probability * 100).toFixed(1)}% risk`
      );
    } catch {
      setResult("Error connecting to server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center overflow-hidden bg-slate-950 font-sans text-white px-4 py-8">
      {/* Abstract Animated Background Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-indigo-600 rounded-full mix-blend-screen filter blur-[128px] opacity-50 animate-blob"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-rose-600 rounded-full mix-blend-screen filter blur-[128px] opacity-40 animate-blob animation-delay-2000"></div>
      <div className="absolute top-[20%] right-[10%] w-72 h-72 bg-emerald-600 rounded-full mix-blend-screen filter blur-[128px] opacity-40 animate-blob animation-delay-4000"></div>

      {/* Main Glassmorphic Card */}
      <div className="relative z-10 w-full max-w-lg bg-slate-900/30 backdrop-blur-2xl border border-white/10 p-8 sm:p-10 rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
        
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-400">
            Heart Risk Predictor
          </h2>
          <p className="text-sm mt-2 text-indigo-300/80">
            AI-powered cardiac analysis
          </p>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          
          <input name="age" type="number" placeholder="Age" onChange={handleChange} className="input col-span-1" required />
          
          <select name="sex" onChange={handleChange} className="input col-span-1" required>
            <option value="" disabled selected hidden>Sex</option>
            <option value="1">Male</option>
            <option value="0">Female</option>
          </select>

          <select name="cp" onChange={handleChange} className="input col-span-1" required>
            <option value="" disabled selected hidden>Chest Pain Type</option>
            <option value="0">Typical Angina</option>
            <option value="1">Atypical Angina</option>
            <option value="2">Non-anginal</option>
            <option value="3">Asymptomatic</option>
          </select>

          <input name="trestbps" type="number" placeholder="Resting BP" onChange={handleChange} className="input col-span-1" required />
          <input name="chol" type="number" placeholder="Cholesterol" onChange={handleChange} className="input col-span-1" required />
          <input name="thalach" type="number" placeholder="Max Heart Rate" onChange={handleChange} className="input col-span-1" required />
          <input name="oldpeak" type="number" step="0.1" placeholder="ST Depression (Oldpeak)" onChange={handleChange} className="input col-span-1" required />

          <select name="exang" onChange={handleChange} className="input col-span-1" required>
            <option value="" disabled selected hidden>Exercise Angina</option>
            <option value="1">Yes</option>
            <option value="0">No</option>
          </select>

          <select name="slope" onChange={handleChange} className="input col-span-1" required>
            <option value="" disabled selected hidden>ST Slope</option>
            <option value="0">Upsloping</option>
            <option value="1">Flat</option>
            <option value="2">Downsloping</option>
          </select>

          <select name="ca" onChange={handleChange} className="input col-span-1" required>
            <option value="" disabled selected hidden>Blocked Vessels</option>
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>

          <select name="thal" onChange={handleChange} className="input sm:col-span-2" required>
            <option value="" disabled selected hidden>Thalassemia</option>
            <option value="1">Normal</option>
            <option value="2">Fixed Defect</option>
            <option value="3">Reversible Defect</option>
          </select>

          <button 
            type="submit" 
            disabled={loading}
            className="sm:col-span-2 mt-4 w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 transition-all duration-300 py-3 rounded-xl font-semibold tracking-wide shadow-lg shadow-indigo-500/30 disabled:opacity-50"
          >
            {loading ? "Analyzing..." : "Generate Analysis"}
          </button>
        </form>

        {result && (
          <div className="mt-8 animate-fade-in">
            <div className={`p-4 rounded-xl border backdrop-blur-md ${
              result.includes("High") || result.includes("Error") 
                ? "bg-red-500/10 border-red-500/20 text-red-300" 
                : "bg-emerald-500/10 border-emerald-500/20 text-emerald-300"
            }`}>
              <div className="text-center font-medium tracking-wide">
                {result}
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default App;