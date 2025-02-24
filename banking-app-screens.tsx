import React, { useState } from 'react';
import { Bell, Settings, Home, Wallet, History, Gift, ChevronRight, Search, Send, QrCode, X, Camera, Plus, User } from 'lucide-react';

const App = () => {
  const [activeScreen, setActiveScreen] = useState('home');
  const [balance] = useState(24680.50);
  const [rewardPoints] = useState(1250);
  const [activeModal, setActiveModal] = useState(null);
  const [sendAmount, setSendAmount] = useState('');
  const [recipientNumber, setRecipientNumber] = useState('');
  
  const recentTransactions = [
    { id: 1, name: 'Amazon Pay', amount: -1299, date: 'Today', type: 'debit' },
    { id: 2, name: 'Salary Credit', amount: 45000, date: 'Yesterday', type: 'credit' },
    { id: 3, name: 'Netflix', amount: -649, date: 'Feb 22', type: 'debit' },
  ];

  const quickActions = [
    { icon: <Send size={24} />, label: 'Send Money', action: () => setActiveModal('send') },
    { icon: <QrCode size={24} />, label: 'Scan QR', action: () => setActiveModal('scan') },
    { icon: <Wallet size={24} />, label: 'Add Money', action: () => setActiveModal('add') },
    { icon: <History size={24} />, label: 'History', action: () => setActiveModal('history') },
  ];

  const Modal = ({ title, onClose, children }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl w-full max-w-md">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="font-semibold">{title}</h3>
          <button onClick={onClose} className="p-1">
            <X size={20} />
          </button>
        </div>
        <div className="p-4">
          {children}
        </div>
      </div>
    </div>
  );

  const SendMoneyModal = () => (
    <Modal title="Send Money" onClose={() => setActiveModal(null)}>
      <div className="space-y-4">
        <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
            <User size={20} className="text-blue-600" />
          </div>
          <input
            type="tel"
            placeholder="Enter mobile number"
            className="flex-1 bg-transparent outline-none"
            value={recipientNumber}
            onChange={(e) => setRecipientNumber(e.target.value)}
          />
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-xl">₹</span>
          <input
            type="number"
            placeholder="Enter amount"
            className="text-2xl w-full outline-none"
            value={sendAmount}
            onChange={(e) => setSendAmount(e.target.value)}
          />
        </div>
        <button 
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium"
          onClick={() => {
            alert(`Sending ₹${sendAmount} to ${recipientNumber}`);
            setActiveModal(null);
            setSendAmount('');
            setRecipientNumber('');
          }}
        >
          Send Money
        </button>
      </div>
    </Modal>
  );

  const ScanQRModal = () => (
    <Modal title="Scan QR Code" onClose={() => setActiveModal(null)}>
      <div className="space-y-4">
        <div className="bg-gray-100 aspect-square rounded-lg flex items-center justify-center">
          <Camera size={48} className="text-gray-400" />
        </div>
        <p className="text-center text-gray-500">Position the QR code within the frame to scan</p>
        <button 
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium"
          onClick={() => {
            alert('QR code scanning simulation');
            setActiveModal(null);
          }}
        >
          Flash On/Off
        </button>
      </div>
    </Modal>
  );

  const AddMoneyModal = () => {
    const [amount, setAmount] = useState('');
    return (
      <Modal title="Add Money" onClose={() => setActiveModal(null)}>
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <span className="text-xl">₹</span>
            <input
              type="number"
              placeholder="Enter amount"
              className="text-2xl w-full outline-none"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-3 gap-2">
            {[1000, 2000, 5000].map((value) => (
              <button
                key={value}
                className="py-2 px-4 border rounded-lg"
                onClick={() => setAmount(value.toString())}
              >
                ₹{value}
              </button>
            ))}
          </div>
          <button 
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium"
            onClick={() => {
              alert(`Adding ₹${amount} to wallet`);
              setActiveModal(null);
              setAmount('');
            }}
          >
            Proceed to Add
          </button>
        </div>
      </Modal>
    );
  };

  const HistoryModal = () => (
    <Modal title="Transaction History" onClose={() => setActiveModal(null)}>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h4 className="font-medium">All Transactions</h4>
          <select className="text-sm border rounded p-1">
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>Last 90 days</option>
          </select>
        </div>
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {[...recentTransactions, ...recentTransactions].map((tx, index) => (
            <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium">{tx.name}</p>
                <p className="text-sm text-gray-500">{tx.date}</p>
              </div>
              <p className={`font-semibold ${tx.type === 'credit' ? 'text-green-600' : 'text-red-600'}`}>
                {tx.type === 'credit' ? '+' : '-'}₹{Math.abs(tx.amount).toLocaleString('en-IN')}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );

  const HomeScreen = () => (
    <div className="space-y-6">
      <div className="bg-blue-600 rounded-xl p-6 text-white">
        <p className="text-sm opacity-80">Available Balance</p>
        <h2 className="text-3xl font-bold">₹{balance.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</h2>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {quickActions.map((action, index) => (
          <button 
            key={index} 
            onClick={action.action}
            className="flex flex-col items-center space-y-2 p-3 rounded-lg hover:bg-gray-100"
          >
            {action.icon}
            <span className="text-xs">{action.label}</span>
          </button>
        ))}
      </div>

      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold">Recent Transactions</h3>
          <button 
            className="text-blue-600 text-sm"
            onClick={() => setActiveModal('history')}
          >
            View All
          </button>
        </div>
        <div className="space-y-4">
          {recentTransactions.map((tx) => (
            <div key={tx.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium">{tx.name}</p>
                <p className="text-sm text-gray-500">{tx.date}</p>
              </div>
              <p className={`font-semibold ${tx.type === 'credit' ? 'text-green-600' : 'text-red-600'}`}>
                {tx.type === 'credit' ? '+' : '-'}₹{Math.abs(tx.amount).toLocaleString('en-IN')}
              </p>
            </div>
          ))}
        </div>
      </div>

      {activeModal === 'send' && <SendMoneyModal />}
      {activeModal === 'scan' && <ScanQRModal />}
      {activeModal === 'add' && <AddMoneyModal />}
      {activeModal === 'history' && <HistoryModal />}
    </div>
  );

  // ... Rest of the components (RewardsScreen, SettingsScreen) remain the same ...
  const RewardsScreen = () => (
    <div className="space-y-6">
      <div className="bg-purple-600 rounded-xl p-6 text-white">
        <p className="text-sm opacity-80">Available Points</p>
        <h2 className="text-3xl font-bold">{rewardPoints.toLocaleString()}</h2>
      </div>

      <div>
        <h3 className="font-semibold mb-4">Available Rewards</h3>
        <div className="space-y-4">
          {rewards.map((reward, index) => (
            <div key={index} className="p-4 border rounded-lg">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-medium">{reward.title}</h4>
                  <p className="text-sm text-gray-500">Expires in {reward.expires}</p>
                </div>
                <button className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm">
                  {reward.points} pts
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const SettingsScreen = () => (
    <div className="space-y-6">
      <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
        <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
          JS
        </div>
        <div>
          <h3 className="font-semibold">John Smith</h3>
          <p className="text-sm text-gray-500">+91 98765 43210</p>
        </div>
      </div>

      <div className="space-y-2">
        {settingsOptions.map((option, index) => (
          <button key={index} className="w-full flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              {option.icon}
              <span>{option.label}</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-500">
              <span className="text-sm">{option.value}</span>
              <ChevronRight size={16} />
            </div>
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen">
      <div className="flex justify-between items-center p-4 border-b">
        <div className="flex items-center space-x-2">
          <h1 className="text-xl font-bold">OneBanc</h1>
        </div>
        <div className="flex items-center space-x-4">
          <button><Search size={24} /></button>
          <button><Bell size={24} /></button>
        </div>
      </div>

      <div className="p-4">
        {activeScreen === 'home' && <HomeScreen />}
        {activeScreen === 'rewards' && <RewardsScreen />}
        {activeScreen === 'settings' && <SettingsScreen />}
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t">
        <div className="max-w-md mx-auto flex justify-around p-4">
          <button 
            onClick={() => setActiveScreen('home')}
            className={`flex flex-col items-center space-y-1 ${activeScreen === 'home' ? 'text-blue-600' : 'text-gray-500'}`}
          >
            <Home size={24} />
            <span className="text-xs">Home</span>
          </button>
          <button 
            onClick={() => setActiveScreen('rewards')}
            className={`flex flex-col items-center space-y-1 ${activeScreen === 'rewards' ? 'text-blue-600' : 'text-gray-500'}`}
          >
            <Gift size={24} />
            <span className="text-xs">Rewards</span>
          </button>
          <button 
            onClick={() => setActiveScreen('settings')}
            className={`flex flex-col items-center space-y-1 ${activeScreen === 'settings' ? 'text-blue-600' : 'text-gray-500'}`}
          >
            <Settings size={24} />
            <span className="text-xs">Settings</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
