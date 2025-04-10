'use client';

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import emailjs from '@emailjs/browser';
import Section from '@/components/sections/Section';

const Contact = () => {
  const formRef = useRef<HTMLFormElement>(null);
  
  // 폼 상태 관리
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    location: '',
    itemType: '일반 생활 폐기물',
    message: ''
  });
  
  // 이메일 전송 상태
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({
    type: null,
    message: ''
  });
  
  // 입력 필드 변경 핸들러
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // 폼 제출 핸들러
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // 유효성 검사
    if (!formData.name || !formData.phone || !formData.email || !formData.location) {
      setSubmitStatus({
        type: 'error',
        message: '필수 항목을 모두 입력해주세요.'
      });
      return;
    }
    
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });
    
    try {
      // EmailJS를 사용하여 이메일 전송
      // 아래 ID들을 실제 EmailJS 서비스와 템플릿 ID로 변경해야 합니다
      await emailjs.sendForm(
        'service_96h7oya', // EmailJS 서비스 ID
        'template_9xxkfyk', // EmailJS 템플릿 ID
        formRef.current!, 
        '0wCY5riqoPKm6JMxB' // EmailJS 퍼블릭 키
      );
      
      // 폼 초기화
      setFormData({
        name: '',
        phone: '',
        email: '',
        location: '',
        itemType: '일반 생활 폐기물',
        message: ''
      });
      
      setSubmitStatus({
        type: 'success',
        message: '문의가 성공적으로 전송되었습니다. 곧 연락드리겠습니다.'
      });
      
    } catch (error) {
      console.error('이메일 전송 중 오류 발생:', error);
      setSubmitStatus({
        type: 'error',
        message: '문의 전송 중 오류가 발생했습니다. 다시 시도해주세요.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Section id="contact" bgColor="emerald" animationType="scale" unobserveOnIntersect={true}>
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-white">수거문의</h2>
        <div className="max-w-3xl mx-auto">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold mb-6 text-center">수거 서비스 문의</h3>
            <p className="text-gray-600 mb-8 text-center">
              수거 서비스에 대한 문의사항이 있으시면 아래 양식을 작성해주세요. 빠르게 답변 드리겠습니다.
            </p>
            
            {/* 상태 메시지 표시 */}
            {submitStatus.type && (
              <div className={`p-4 mb-6 rounded-md ${submitStatus.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {submitStatus.message}
              </div>
            )}
            
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">이름 *</label>
                  <input 
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md" 
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">연락처 *</label>
                  <input 
                    type="tel" 
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md" 
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">이메일 *</label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md" 
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">수거 요청 지역 *</label>
                <input 
                  type="text" 
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md" 
                  placeholder="예: 서울시 강남구" 
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">수거 품목</label>
                <select 
                  name="itemType"
                  value={formData.itemType}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option>일반 생활 폐기물</option>
                  <option>재활용 폐기물</option>
                  <option>대형 폐기물</option>
                  <option>사업장 폐기물</option>
                  <option>기타</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">추가 요청사항</label>
                <textarea 
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md h-32"
                ></textarea>
              </div>
              <Button 
                type="submit" 
                className="w-full bg-emerald-500 hover:bg-emerald-600 hover:text-white"
                disabled={isSubmitting}
              >
                {isSubmitting ? '전송 중...' : '문의하기'}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Contact;