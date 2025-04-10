// app/api/send-email/route.ts

import { NextResponse } from 'next/server';
import axios from 'axios';

// API 키와 같은 민감한 정보는 환경 변수로 관리
const ELASTIC_EMAIL_API_KEY = process.env.ELASTIC_EMAIL_API_KEY;
const RECEIVER_EMAIL = process.env.RECEIVER_EMAIL || 'your-admin-email@example.com';
const SENDER_EMAIL = process.env.SENDER_EMAIL || 'your-sending-email@example.com';

export async function POST(request: Request) {
  try {
    // 요청 바디 파싱
    const body = await request.json();
    const { name, phone, email, location, itemType, message } = body;
    
    // 필수 필드 검증
    if (!name || !phone || !email || !location) {
      return NextResponse.json(
        { message: '필수 정보가 누락되었습니다.' },
        { status: 400 }
      );
    }
    
    // Elastic Email API를 사용해 이메일 전송
    await axios.post('https://api.elasticemail.com/v4/emails/transactional', {
      Recipients: [{ 
        Email: RECEIVER_EMAIL,
        Fields: {
          name: "관리자"
        }
      }],
      Content: {
        Body: [
          {
            ContentType: "HTML",
            Content: `
              <h2>새로운 수거 문의가 도착했습니다</h2>
              <p><strong>이름:</strong> ${name}</p>
              <p><strong>연락처:</strong> ${phone}</p>
              <p><strong>이메일:</strong> ${email}</p>
              <p><strong>수거 요청 지역:</strong> ${location}</p>
              <p><strong>수거 품목:</strong> ${itemType}</p>
              <p><strong>추가 요청사항:</strong> ${message || '없음'}</p>
            `
          },
          {
            ContentType: "PlainText",
            Content: `
              새로운 수거 문의가 도착했습니다
              이름: ${name}
              연락처: ${phone}
              이메일: ${email}
              수거 요청 지역: ${location}
              수거 품목: ${itemType}
              추가 요청사항: ${message || '없음'}
            `
          }
        ],
        Subject: `새 수거문의: ${name}님 (${location})`,
        From: SENDER_EMAIL
      }
    }, {
      headers: {
        'X-ElasticEmail-ApiKey': ELASTIC_EMAIL_API_KEY,
        'Content-Type': 'application/json'
      }
    });
    
    return NextResponse.json({ success: true, message: '문의가 성공적으로 전송되었습니다.' });
    
  } catch (error) {
    console.error('이메일 전송 중 오류 발생:', error);
    return NextResponse.json(
      { message: '서버 오류가 발생했습니다. 다시 시도해주세요.' },
      { status: 500 }
    );
  }
}