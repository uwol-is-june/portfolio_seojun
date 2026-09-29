import Link from "next/link";
import { ShieldCheck, BarChart3, FileSearch } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-blue-600" />
            <span className="font-bold text-gray-900">보장분석</span>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="flex-1 flex flex-col items-center justify-center text-center px-6 py-20">
        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full mb-6">
          <ShieldCheck className="w-3.5 h-3.5" />
          CODEF API DEV
        </span>
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-5 leading-tight">
          내 보험 보장,<br />한눈에 확인하세요
        </h1>
        <p className="text-lg text-gray-500 max-w-xl mb-10">
          흩어진 보험 증권을 자동으로 불러와 보장 현황을 분석하고<br />
          부족한 보장을 찾아드립니다.
        </p>
        <Link
          href="/demo/coverage/dashboard"
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-8 py-3.5 rounded-xl transition-colors"
        >
          보장분석 시작
        </Link>
      </section>

      {/* Features */}
      <section className="bg-white border-t border-gray-100 py-16 px-6">
        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8">
          {[
            {
              icon: <FileSearch className="w-6 h-6 text-blue-600" />,
              title: "보험 자동 조회",
              desc: "CODEF API로 주요 보험사 가입 내역을 한번에 조회합니다.",
            },
            {
              icon: <BarChart3 className="w-6 h-6 text-blue-600" />,
              title: "보장 현황 분석",
              desc: "사망·암·뇌·심장·입원일당 등 항목별 보장 현황을 시각화합니다.",
            },
            {
              icon: <ShieldCheck className="w-6 h-6 text-blue-600" />,
              title: "갭 분석",
              desc: "권장 보장 대비 부족한 항목을 찾아 맞춤 리포트를 제공합니다.",
            },
          ].map((f) => (
            <div key={f.title} className="flex flex-col gap-3">
              <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                {f.icon}
              </div>
              <h3 className="font-semibold text-gray-900">{f.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
