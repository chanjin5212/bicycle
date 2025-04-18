export function Footer() {
    return (
      <footer className="bg-black text-white py-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-6 md:mb-0">
              <div className="text-xl font-semibold mb-2">workflow@imweb.com</div>
              <div className="text-xl font-semibold">010-4266-8233</div>
            </div>
            <div className="text-right text-sm">
              <div className="mb-2">대표: 김정민 | 주소: 서울시 강남구 테헤란로</div>
              <div className="mb-4">사업자등록번호: 732-23-01019</div>
            </div>
          </div>
          <div className="mt-16">
            <h2 className="text-5xl font-bold">미래환경</h2>
          </div>
        </div>
      </footer>
    );
  }