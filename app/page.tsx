"use client";

import React, { useState } from 'react';
import { Camera, Send, CheckCircle, XCircle, LayoutDashboard, ClipboardList, Home, AlertCircle, MessageSquare, BarChart3, ArrowLeft, UploadCloud } from 'lucide-react';

export default function RingiApp() {
  const [view, setView] = useState<'portal' | 'applicant' | 'approver'>('portal');
  const [applicantTab, setApplicantTab] = useState<'new' | 'status'>('new');
  const [approverTab, setApproverTab] = useState<'list' | 'report'>('list');
  
  const [applicantName, setApplicantName] = useState("");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState<number | "">("");
  const [purpose, setPurpose] = useState("");
  
  const [showDemoAlert, setShowDemoAlert] = useState(false);
  const [rejectModal, setRejectModal] = useState<{isOpen: boolean, itemId: number | null}>({isOpen: false, itemId: null});
  const [rejectComment, setRejectComment] = useState("");

  const getApprovalRoute = () => {
    if (!category || !amount || amount === "") return "内容を入力してください";
    const num = Number(amount);

    if (category === "研修費" || category === "教材費" || category === "予備費") {
      if (num < 30000) return "園長（決裁）";
      if (num < 60000) return "園長 → 社長（決裁）";
      return "園長 → 社長 → 代表（決裁）";
    }
    if (category === "備品") {
      if (num < 100000) return "園長（決裁）";
      if (num < 300000) return "園長 → 社長（決裁）";
      return "園長 → 社長 → 代表（決裁）";
    }
    if (category === "修繕費") {
      if (num < 150000) return "園長（決裁）";
      if (num < 300000) return "園長 → 社長（決裁）";
      return "園長 → 社長 → 代表（決裁）";
    }
    return "園長（決裁）";
  };

  return (
    <div className="bg-gray-800 min-h-screen font-sans flex flex-col">
      
      {/* 1. ポータル画面 */}
      {view === 'portal' && (
        <div className="w-full max-w-sm md:max-w-2xl mx-auto bg-gray-50 min-h-screen flex flex-col items-center justify-center p-6 transition-all duration-300">
          <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl w-full space-y-8 border border-gray-100">
            <div className="text-center">
              <div className="bg-blue-100 w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6">
                <ClipboardList className="w-10 h-10 md:w-12 md:h-12 text-blue-600" />
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">経費申請ポータル</h1>
              <p className="text-gray-500 mt-2 text-sm md:text-base">保育業務のDXをサポートします</p>
            </div>

            <div className="space-y-4 md:space-y-0 md:grid md:grid-cols-2 md:gap-6">
              <button onClick={() => setView('applicant')} className="w-full bg-blue-600 hover:bg-blue-700 text-white p-5 rounded-2xl shadow-md font-bold transition flex flex-col items-center justify-center space-y-2">
                <Camera className="w-8 h-8" />
                <span className="text-lg">申請者メニュー</span>
                <span className="text-xs text-blue-200 font-normal">保育士・職員向け</span>
              </button>
              
              <button onClick={() => setView('approver')} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white p-5 rounded-2xl shadow-md font-bold transition flex flex-col items-center justify-center space-y-2">
                <LayoutDashboard className="w-8 h-8" />
                <span className="text-lg">管理者メニュー</span>
                <span className="text-xs text-indigo-200 font-normal">園長・社長向け</span>
              </button>
            </div>
            <p className="text-[10px] text-center text-gray-400 font-mono mt-8">APP ID: REQ-2026-AUTO-GEN</p>
          </div>
        </div>
      )}

      {/* 2. 申請画面 */}
      {view === 'applicant' && (
        <div className="w-full max-w-md md:max-w-3xl mx-auto bg-gray-50 min-h-screen pb-24 relative shadow-2xl transition-all duration-300">
          <header className="bg-blue-600 text-white p-6 md:p-8 shadow-md rounded-b-3xl">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-xl md:text-2xl font-bold">経費申請フォーム</h1>
                <p className="text-xs md:text-sm text-blue-100 mt-1">ID: REQ-{Math.floor(1000 + Math.random() * 9000)}</p>
              </div>
              <button onClick={() => setView('portal')} className="p-3 bg-blue-700 rounded-full hover:bg-blue-800 transition"><Home className="w-5 h-5 md:w-6 md:h-6" /></button>
            </div>
            
            <div className="flex mt-6 md:mt-8 bg-blue-700 rounded-xl p-1 max-w-sm mx-auto">
              <button onClick={() => setApplicantTab('new')} className={`flex-1 py-2 md:py-3 text-sm md:text-base font-bold rounded-lg transition ${applicantTab === 'new' ? 'bg-white text-blue-600 shadow' : 'text-blue-100 hover:text-white'}`}>新規申請</button>
              <button onClick={() => setApplicantTab('status')} className={`flex-1 py-2 md:py-3 text-sm md:text-base font-bold rounded-lg transition ${applicantTab === 'status' ? 'bg-white text-blue-600 shadow' : 'text-blue-100 hover:text-white'}`}>履歴・状況</button>
            </div>
          </header>

          <main className="p-6 md:p-8">
            {applicantTab === 'new' && (
              <div className="space-y-5">
                
                {/* PCでは2列になる設定 (md:grid md:grid-cols-2) */}
                <div className="space-y-5 md:space-y-0 md:grid md:grid-cols-2 md:gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">申請者名</label>
                    <input type="text" placeholder="お名前を入力してください" className="w-full border-gray-300 border p-3 rounded-xl bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 outline-none shadow-sm" value={applicantName} onChange={(e) => setApplicantName(e.target.value)} />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">所属園</label>
                    <select defaultValue="" className="w-full border-gray-300 border p-3 rounded-xl bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 outline-none shadow-sm">
                      <option value="" disabled>園を選択してください</option>
                      <option value="A">A保育園</option>
                      <option value="B">Bこども園</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">費目</label>
                    <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full border-gray-300 border p-3 rounded-xl bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 outline-none shadow-sm">
                      <option value="" disabled>費目を選択してください</option>
                      <option value="研修費">研修費</option>
                      <option value="教材費">教材費</option>
                      <option value="備品">備品</option>
                      <option value="修繕費">修繕費</option>
                      <option value="予備費">予備費</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">用途</label>
                    <input type="text" placeholder="例：粘土・画用紙の補充" className="w-full border-gray-300 border p-3 rounded-xl bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 outline-none shadow-sm" value={purpose} onChange={(e) => setPurpose(e.target.value)} />
                  </div>
                </div>

                {/* PCでは金額とルートを横並びに */}
                <div className="space-y-5 md:space-y-0 md:grid md:grid-cols-2 md:gap-6 items-end">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">金額</label>
                    <div className="relative">
                      <span className="absolute left-4 top-3.5 text-gray-500 font-bold">¥</span>
                      <input type="number" placeholder="0" className="w-full border-gray-300 border p-3 pl-10 rounded-xl bg-white text-gray-900 text-lg font-bold focus:ring-2 focus:ring-blue-500 outline-none shadow-sm" value={amount} onChange={(e) => setAmount(e.target.value === "" ? "" : Number(e.target.value))} />
                    </div>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 p-4 rounded-xl h-full flex flex-col justify-center">
                    <p className="text-[10px] text-blue-600 font-bold uppercase mb-1">予定承認ルート</p>
                    <div className="flex items-center space-x-2 text-blue-800 font-bold">
                      <CheckCircle className="w-4 h-4 shrink-0" />
                      <span className="text-sm md:text-base">{getApprovalRoute()}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <button className="w-full border-2 border-dashed border-blue-400 rounded-2xl p-8 flex flex-col items-center justify-center bg-blue-50 hover:bg-blue-100 transition-colors">
                    <div className="flex space-x-4 mb-3">
                      <Camera className="w-8 h-8 md:w-10 md:h-10 text-blue-500" />
                      <UploadCloud className="w-8 h-8 md:w-10 md:h-10 text-blue-500" />
                    </div>
                    <span className="text-blue-700 font-bold text-sm md:text-base">撮影 / ファイルを選択</span>
                    <span className="text-xs text-blue-500 mt-2">※PCの場合はフォルダが開きます</span>
                  </button>
                </div>

                <button onClick={() => setShowDemoAlert(true)} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl shadow-lg mt-6 flex items-center justify-center space-x-2 transition text-lg">
                  <Send className="w-5 h-5 md:w-6 md:h-6" />
                  <span>申請を送信する</span>
                </button>
              </div>
            )}

            {applicantTab === 'status' && (
              <div className="space-y-4 md:space-y-0 md:grid md:grid-cols-2 md:gap-4">
                <div className="bg-white p-5 rounded-2xl shadow-sm border border-orange-100">
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-bold text-gray-800">備品（空気清浄機）</span>
                    <span className="text-xs text-gray-400 font-mono">REQ-8821</span>
                  </div>
                  <div className="text-xl font-bold text-gray-900 mb-3">¥45,000</div>
                  <div className="bg-orange-50 text-orange-700 p-3 rounded-xl text-sm font-bold flex items-center space-x-2">
                    <div className="w-4 h-4 rounded-full border-2 border-orange-500 border-t-transparent animate-spin shrink-0"></div>
                    <span>園長承認済、現在社長の決裁待ち</span>
                  </div>
                </div>
              </div>
            )}
          </main>

          {showDemoAlert && (
            <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-6 backdrop-blur-sm">
              <div className="bg-white rounded-3xl p-8 w-full max-w-sm text-center shadow-2xl">
                <h3 className="text-xl font-bold text-gray-900 mb-2">送信完了（デモ）</h3>
                <p className="text-gray-600 mb-6 text-sm">Googleスプレッドシートへの記帳と、{getApprovalRoute().split(' ')[0]}へのGmail通知をシミュレートしました。</p>
                <button onClick={() => { setShowDemoAlert(false); setApplicantTab('status'); }} className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl">閉じる</button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 3. 管理画面 */}
      {view === 'approver' && (
        <div className="w-full max-w-md md:max-w-4xl mx-auto bg-gray-50 min-h-screen pb-24 relative shadow-2xl transition-all duration-300">
          <header className="bg-indigo-700 text-white p-6 md:p-8 shadow-md rounded-b-3xl">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-xl md:text-2xl font-bold">管理者ダッシュボード</h1>
              <button onClick={() => setView('portal')} className="p-3 bg-indigo-800 hover:bg-indigo-900 rounded-full text-white transition"><Home className="w-5 h-5 md:w-6 md:h-6" /></button>
            </div>
            
            <div className="flex bg-indigo-800 rounded-xl p-1 max-w-md mx-auto">
              <button onClick={() => setApproverTab('list')} className={`flex-1 py-2 md:py-3 text-sm md:text-base font-bold rounded-lg transition ${approverTab === 'list' ? 'bg-white text-indigo-700 shadow' : 'text-indigo-100 hover:text-white'}`}>承認待ちリスト</button>
              <button onClick={() => setApproverTab('report')} className={`flex-1 py-2 md:py-3 text-sm md:text-base font-bold rounded-lg transition ${approverTab === 'report' ? 'bg-white text-indigo-700 shadow' : 'text-indigo-100 hover:text-white'}`}>月次レポート</button>
            </div>
          </header>

          <main className="p-6 md:p-8">
            {approverTab === 'list' && (
              <div className="space-y-4 md:space-y-0 md:grid md:grid-cols-2 md:gap-6">
                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-bold text-gray-900 text-lg">山田 太郎</h3>
                      <p className="text-xs text-gray-500">A保育園 / 教材費</p>
                    </div>
                    <div className="bg-red-50 text-red-600 text-[10px] md:text-xs font-bold px-2 py-1 rounded border border-red-100">予算90%超過注意</div>
                  </div>
                  <p className="text-sm text-gray-600 mb-4 bg-gray-50 p-3 rounded-lg italic">「粘土・画用紙の補充」</p>
                  <div className="text-2xl md:text-3xl font-bold text-indigo-700 mb-6">¥12,800</div>
                  <div className="flex space-x-3">
                    <button onClick={() => setRejectModal({isOpen: true, itemId: 1})} className="flex-1 py-3 bg-gray-100 text-gray-600 rounded-xl font-bold text-sm hover:bg-gray-200 transition">差し戻し</button>
                    <button className="flex-1 py-3 bg-indigo-600 text-white rounded-xl font-bold text-sm shadow-md hover:bg-indigo-700 transition">承認する</button>
                  </div>
                </div>
                
                {/* PC表示用のダミーデータ2つ目 */}
                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hidden md:block opacity-70">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-bold text-gray-900 text-lg">佐藤 花子</h3>
                      <p className="text-xs text-gray-500">Bこども園 / 備品</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-4 bg-gray-50 p-3 rounded-lg italic">「職員室用 扇風機2台」</p>
                  <div className="text-2xl md:text-3xl font-bold text-indigo-700 mb-6">¥15,000</div>
                  <div className="flex space-x-3">
                    <button className="flex-1 py-3 bg-gray-100 text-gray-600 rounded-xl font-bold text-sm">差し戻し</button>
                    <button className="flex-1 py-3 bg-indigo-600 text-white rounded-xl font-bold text-sm shadow-md">承認する</button>
                  </div>
                </div>
              </div>
            )}

            {approverTab === 'report' && (
              <div className="space-y-6 md:space-y-0 md:grid md:grid-cols-2 md:gap-8">
                <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100">
                  <h3 className="text-base md:text-lg font-bold text-gray-800 mb-6 flex items-center space-x-2">
                    <BarChart3 className="w-5 h-5 text-indigo-500" />
                    <span>2026年4月 費目別集計</span>
                  </h3>
                  
                  <div className="space-y-6">
                    {[
                      { label: "教材費", value: 45000, color: "bg-blue-500", limit: 50000 },
                      { label: "備品", value: 128000, color: "bg-orange-500", limit: 150000 },
                      { label: "研修費", value: 15000, color: "bg-green-500", limit: 30000 },
                      { label: "修繕費", value: 290000, color: "bg-red-500", limit: 300000 },
                    ].map((item, i) => (
                      <div key={i}>
                        <div className="flex justify-between text-sm mb-2 font-bold">
                          <span className="text-gray-600">{item.label}</span>
                          <span className="text-gray-900">¥{item.value.toLocaleString()} / ¥{item.limit.toLocaleString()}</span>
                        </div>
                        <div className="w-full bg-gray-100 h-3 md:h-4 rounded-full overflow-hidden">
                          <div className={`${item.color} h-full transition-all duration-1000`} style={{ width: `${(item.value / item.limit) * 100}%` }}></div>
                        </div>
                        {item.value / item.limit >= 0.9 && (
                          <p className="text-xs text-red-500 font-bold mt-2 flex items-center">
                            <AlertCircle className="w-4 h-4 mr-1" /> 予算の90%を超過しています
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col justify-center space-y-6">
                  <div className="bg-indigo-50 p-6 rounded-2xl border border-indigo-100">
                    <h4 className="font-bold text-indigo-800 mb-2">経費管理の自動化</h4>
                    <p className="text-sm text-indigo-700 leading-relaxed">
                      このグラフはGoogleスプレッドシートの集計データと連動しています。月次の締め作業や、予算消化率の確認がリアルタイムで可能になります。
                    </p>
                  </div>
                  
                  <button className="w-full py-5 bg-white hover:bg-gray-50 border-2 border-indigo-100 text-indigo-600 font-bold rounded-2xl flex items-center justify-center space-x-2 shadow-sm transition">
                    <ArrowLeft className="w-5 h-5 rotate-90" />
                    <span>スプレッドシートで詳細を見る</span>
                  </button>
                </div>
              </div>
            )}
          </main>

          {rejectModal.isOpen && (
            <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-6 backdrop-blur-sm">
              <div className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center space-x-2">
                  <MessageSquare className="w-6 h-6 text-red-500" />
                  <span>差し戻し理由（必須）</span>
                </h3>
                <textarea className="w-full border border-gray-300 rounded-xl p-4 text-gray-900 h-32 mb-6 bg-gray-50 focus:ring-2 focus:ring-red-500 outline-none" placeholder="例：領収書の日付が判別できません。再撮影をお願いします。" value={rejectComment} onChange={(e) => setRejectComment(e.target.value)}></textarea>
                <div className="flex space-x-4">
                  <button onClick={() => { setRejectModal({isOpen: false, itemId: null}); setRejectComment(""); }} className="flex-1 py-4 font-bold text-gray-500 bg-gray-100 hover:bg-gray-200 rounded-xl transition">キャンセル</button>
                  <button onClick={() => {
                      if(!rejectComment.trim()) return alert('コメントを入力してください');
                      alert(`デモ: 差し戻し通知を送信しました。`);
                      setRejectModal({isOpen: false, itemId: null});
                      setRejectComment("");
                    }}
                    className={`flex-1 py-4 font-bold rounded-xl text-white transition ${rejectComment.trim() ? 'bg-red-500 hover:bg-red-600' : 'bg-red-200'}`}>差し戻す</button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

    </div>
  );
}