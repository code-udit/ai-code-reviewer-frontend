"use client";

import { useState } from "react";
import { analyzeCode } from "./services/api";
import dynamic from "next/dynamic";

const Editor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
});

type Issue = {
  type: string;
  message: string;
};

type AIReview = {
  explanation: string;
  suggestions: string[];
  improved_code: string;
};

type ResultType = {
  score: number;
  issues: Issue[];
  ai_review: AIReview;
};

/* TEST CASES */
const testCases = [
  {
    title: "Test 1: Missing Colon",
    code: `def greet()
    print("Hello")`,
  },
  {
    title: "Test 2: Missing Return",
    code: `def check_number(x):
    if x > 10:
        print("Big")
    else:
        print("Small")`,
  },
  {
    title: "Test 3: Division by Zero",
    code: `def divide(a, b):
    return a / b`,
  },
  {
    title: "Test 4: Indentation Error",
    code: `def greet():
print("Hello")`,
  },
  {
    title: "Test 5: Unused Variable",
    code: `def test():
    x = 10
    y = 20
    return x`,
  },
  {
    title: "Test 6: Missing Operator",
    code: `def calculate(a, b):
    x = a + b
    y = a * b
    return x y`,
  },
  {
    title: "Test 7: Inefficient Loop",
    code: `def get_items(lst):
    result = []
    for i in range(len(lst)):
        result.append(lst[i])
    return result`,
  },
  {
    title: "Test 8: Index Risk",
    code: `def get_element(lst, index):
    return lst[index]`,
  },
  {
    title: "Test 9: Correct Code",
    code: `def add(a, b):
    return a + b`,
  },
  {
    title: "Test 10: Loop Optimization",
    code: `def process_numbers(lst):
    total = 0
    for i in range(len(lst)):
        total = total + lst[i]
    return total`,
  },
];

export default function Home() {
  const [code, setCode] = useState("");
  const [result, setResult] = useState<ResultType | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showTests, setShowTests] = useState(false); // ✅ NEW

  const handleAnalyze = async () => {
    setLoading(true);
    setError("");

    const res = await analyzeCode(code);

    if (!res.success) {
      setError(res.message);
      setLoading(false);
      return;
    }

    setResult(res.data);
    setLoading(false);
  };

  const copyCode = () => {
    if (result) {
      navigator.clipboard.writeText(result.ai_review.improved_code);
    }
  };

  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-6xl space-y-6">
        <h1 className="text-4xl md:text-5xl font-bold text-center text-white">
          AI Code Reviewer
        </h1>
        <p className="text-center text-gray-400 max-w-xl mx-auto">
          Analyze your Python code, detect issues, and improve it with
          AI-powered suggestions.
        </p>

        {/* ✅ EDITOR + SIDE PANEL */}
        <div className="flex gap-4">
          {/* LEFT: EDITOR */}
          <div className="flex-1 bg-white/5 backdrop-blur-md p-5 rounded-2xl border border-white/10 shadow-xl">
            <Editor
              height="300px"
              defaultLanguage="python"
              value={code}
              onChange={(value: string | undefined) => setCode(value || "")}
              theme="vs-dark"
            />

            <button
              onClick={handleAnalyze}
              disabled={loading}
              className="mt-4 w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition disabled:opacity-50"
            >
              {loading ? "⏳ Analyzing..." : "Analyze Code"}
            </button>

            <button
              onClick={() => {
                setCode("");
                setResult(null);
                setError("");
              }}
              className="mt-2 w-full px-4 py-2 bg-gray-300 rounded"
            >
              Clear
            </button>

            {error && (
              <div className="mt-3 bg-red-100 text-red-700 p-3 rounded">
                {error}
              </div>
            )}

            {!result && !loading && !error && (
              <div className="text-center text-gray-500 mt-4">
                Paste your code and click <b>Analyze</b> 🚀
              </div>
            )}
          </div>

          {/* ✅ RIGHT: TEST PANEL */}
          <div className="w-72">
            <button
              onClick={() => setShowTests(!showTests)}
              className="w-full bg-purple-600 text-white py-2 rounded-lg font-semibold"
            >
              Testing Codes ⬇
            </button>

            {showTests && (
              <div className="mt-2 bg-white/5 backdrop-blur-md p-3 rounded-xl border border-white/10 shadow max-h-[300px] overflow-auto space-y-3">
                {testCases.map((test, i) => (
                  <div key={i} className="border p-2 rounded">
                    <h3 className="font-semibold text-sm">{test.title}</h3>

                    <pre className="bg-gray-900 text-green-400 p-2 rounded text-xs mt-1 overflow-auto">
                      {test.code}
                    </pre>

                    <div className="flex gap-2 mt-2">
                      <button
                        onClick={() => setCode(test.code)}
                        className="flex-1 bg-blue-500 text-white text-xs py-1 rounded"
                      >
                        Use
                      </button>

                      <button
                        onClick={() => navigator.clipboard.writeText(test.code)}
                        className="flex-1 bg-gray-700 text-white text-xs py-1 rounded"
                      >
                        Copy
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* RESULT */}
        {result && (
          <div className="bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-white/10 shadow-xl space-y-6">
            <div>
              <h2 className="text-lg font-semibold text-white">Score</h2>
              <div className="w-full bg-gray-200 rounded-full h-4 mt-2 overflow-hidden">
                <div
                  className={`h-4 rounded-full ${
                    result.score > 80
                      ? "bg-green-500"
                      : result.score > 50
                        ? "bg-yellow-500"
                        : "bg-red-500"
                  }`}
                  style={{ width: `${result.score}%` }}
                />
              </div>
              <p className="mt-1 text-sm text-gray-400">{result.score}/100</p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-white">Issues</h2>
              {result.issues.length === 0 ? (
                <p className="text-green-600 mt-2">✅ No issues</p>
              ) : (
                <ul className="mt-2 space-y-2">
                  {result.issues.map((issue, i) => (
                    <li
                      key={i}
                      className="bg-red-50 border border-red-200 p-3 rounded text-red-700"
                    >
                      ⚠ {issue.message}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div>
              <h2 className="text-lg font-semibold text-white">Suggestions</h2>
              <ul className="mt-2 space-y-2">
                {result.ai_review.suggestions.map((s, i) => (
                  <li
                    key={i}
                    className="bg-blue-50 border border-blue-200 p-3 rounded text-gray-800"
                  >
                    💡 {s}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold text-white">
                  Improved Code
                </h2>
                <button
                  onClick={copyCode}
                  className="px-3 py-1 bg-gray-800 text-white rounded text-sm hover:bg-black"
                >
                  Copy
                </button>
              </div>

              <pre className="mt-3 bg-gray-900 text-green-400 p-4 rounded-lg overflow-auto text-sm font-mono">
                {result.ai_review.improved_code}
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}