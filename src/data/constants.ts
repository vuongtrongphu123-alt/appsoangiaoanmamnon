import { LessonPlan, DomainId, AgeGroupId } from '../types';

export const DOMAIN_ACTIVITIES: Record<DomainId, string[]> = {
  nhan_thuc: [
    'Làm quen với toán (Đếm, Số lượng, Hình dạng, Kích thước)',
    'Khám phá khoa học (Cây cối, Động vật, Hiện tượng tự nhiên)',
    'Khám phá xã hội (Gia đình, Nghề nghiệp, Quê hương đất nước)',
    'Hoạt động STEAM / Thí nghiệm khoa học vui',
  ],
  ngon_ngu: [
    'Làm quen tác phẩm văn học: Thơ',
    'Làm quen tác phẩm văn học: Truyện kể',
    'Phát triển vốn từ & Đàm thoại gợi mở',
    'Làm quen với chữ cái (Dành cho mẫu giáo 5-6 tuổi)',
  ],
  the_chat: [
    'Phát triển vận động: Vận động cơ bản (Đi, Chạy, Nhảy, Bò, Trèo)',
    'Trò chơi vận động tiếp sức',
    'Phát triển vận động tinh (Xâu hạt, gắp đồ vật, xé dán)',
    'Giáo dục dinh dưỡng và vệ sinh cá nhân',
  ],
  tham_my: [
    'Âm nhạc: Dạy hát & Vận động theo nhạc',
    'Âm nhạc: Nghe hát & Trò chơi âm nhạc',
    'Tạo hình: Vẽ theo đề tài / tự do',
    'Tạo hình: Nặn đồ vật / con vật quen thuộc',
    'Tạo hình: Xé dán giấy màu, làm đồ chơi sáng tạo',
  ],
  tinh_cam: [
    'Giáo dục kỹ năng sống & Tự phục vụ',
    'Nhận biết & Quản lý cảm xúc bản thân (SEL)',
    'Hợp tác, chia sẻ và yêu thương bạn bè',
    'Giáo dục tình yêu gia đình & Bảo vệ môi trường',
  ],
};

export const AGE_GROUP_CONFIG: Record<
  AgeGroupId,
  { label: string; group: 'nhà trẻ' | 'mẫu giáo'; defaultDuration: string }
> = {
  '3-12m': {
    label: '3 đến 12 tháng tuổi (Nhà trẻ)',
    group: 'nhà trẻ',
    defaultDuration: '10 - 12 phút',
  },
  '12-18m': {
    label: '12 đến 18 tháng tuổi (Nhà trẻ)',
    group: 'nhà trẻ',
    defaultDuration: '12 - 15 phút',
  },
  '18-24m': {
    label: '18 đến 24 tháng tuổi (Nhà trẻ)',
    group: 'nhà trẻ',
    defaultDuration: '15 - 18 phút',
  },
  '24-36m': {
    label: '24 đến 36 tháng tuổi (Nhóm trẻ lớn)',
    group: 'nhà trẻ',
    defaultDuration: '15 - 20 phút',
  },
  '3-4t': {
    label: 'Mẫu giáo bé (3 đến 4 tuổi)',
    group: 'mẫu giáo',
    defaultDuration: '20 - 25 phút',
  },
  '4-5t': {
    label: 'Mẫu giáo nhỡ (4 đến 5 tuổi)',
    group: 'mẫu giáo',
    defaultDuration: '25 - 30 phút',
  },
  '5-6t': {
    label: 'Mẫu giáo lớn (5 đến 6 tuổi)',
    group: 'mẫu giáo',
    defaultDuration: '30 - 35 phút',
  },
};

export const SAMPLE_LESSONS: LessonPlan[] = [
  {
    id: 'plan-sample-1',
    title: 'Đếm đến 5, nhận biết các nhóm có 5 đối tượng và chữ số 5',
    domain: 'nhan_thuc',
    domainName: 'Phát triển nhận thức',
    ageGroup: '4-5t',
    ageName: 'Mẫu giáo nhỡ (4 - 5 tuổi)',
    duration: '25 - 30 phút',
    theme: 'Thế giới Thực vật',
    subTheme: 'Một số loại hoa quả mùa xuân',
    style: 'chi_tiet',
    year: '2026–2027',
    school: 'Trường MN Sơn Đồng 3',
    className: 'Lớp Mẫu giáo 4-5 tuổi B5',
    contentHtml: `
      <div class="text-center font-bold pb-4 border-b border-slate-200">
        <h2 class="text-lg uppercase text-sky-800 tracking-wide">GIÁO ÁN PHÁT TRIỂN NHẬN THỨC</h2>
        <p class="text-sm font-bold text-slate-800 mt-1">ĐỀ TÀI: ĐẾM ĐẾN 5, NHẬN BIẾT NHÓM CÓ 5 ĐỐI TƯỢNG VÀ CHỮ SỐ 5</p>
        <div class="text-xs text-slate-700 font-semibold space-y-1 mt-2.5 text-left max-w-xs mx-auto">
          <div>Lĩnh vực: Phát triển nhận thức</div>
          <div>Lứa tuổi: Mẫu giáo 4 - 5 tuổi</div>
          <div>Thời gian: 25 - 30 phút</div>
          <div>Năm học: 2026–2027</div>
        </div>
      </div>

      <div class="mt-4 space-y-4 text-xs leading-relaxed text-slate-800">
        <div>
          <h3 class="font-bold text-sm text-sky-700 uppercase tracking-wide">I. MỤC TIÊU BÀI HỌC</h3>
          <p><strong>1. Kiến thức:</strong> Trẻ biết đếm từ 1 đến 5 theo thứ tự từ trái qua phải; nhận biết được các nhóm có số lượng trong phạm vi 5; nhận biết và phát âm đúng chữ số 5.</p>
          <p><strong>2. Kỹ năng:</strong> Rèn kỹ năng đếm thành thạo, so sánh tạo sự bằng nhau giữa 2 nhóm đối tượng; rèn sự phối hợp khéo léo của mắt và tay khi thao tác xếp que tính, quả bông.</p>
          <p><strong>3. Thái độ:</strong> Trẻ hào hứng, tích cực tham gia hoạt động, biết kiên nhẫn lắng nghe bạn và giữ gìn đồ dùng học tập cẩn thận.</p>
          <p><strong>4. Năng lực hình thành:</strong> Năng lực quan sát, tư duy toán học mầm non trực quan, tự tin chia sẻ phát hiện của mình trước cô và các bạn.</p>
        </div>

        <div>
          <h3 class="font-bold text-sm text-sky-700 uppercase tracking-wide">II. CHUẨN BỊ</h3>
          <p><strong>1. Đồ dùng của cô:</strong> Máy chiếu, video bài hát "Màu hoa"; mô hình vườn cây ăn quả có các nhóm quả 3, 4, 5; thẻ số 1, 2, 3, 4, 5 cỡ lớn; que chỉ.</p>
          <p><strong>2. Đồ dùng của trẻ:</strong> Mỗi trẻ một rổ gồm 5 cây hoa, 5 chú bướm, thẻ số từ 1 đến 5; đồ chơi tái chế (nắp chai đánh số) cho trò chơi củng cố.</p>
          <p><strong>3. Môi trường:</strong> Lớp học sạch sẽ, thoáng mát, bố trí các góc học tập mở để trẻ thuận tiện di chuyển.</p>
        </div>

        <div>
          <h3 class="font-bold text-sm text-sky-700 uppercase tracking-wide">III. TIẾN HÀNH HOẠT ĐỘNG</h3>
          <div class="overflow-x-auto my-2">
            <table class="w-full border border-slate-400 text-left border-collapse">
              <thead>
                <tr class="bg-slate-100 text-slate-900 font-bold border-b border-slate-400">
                  <th class="p-2.5 border-r border-slate-400 w-1/2 text-center">Hoạt động của cô</th>
                  <th class="p-2.5 w-1/2 text-center">Hoạt động của trẻ</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="p-3 border-r border-slate-400 align-top space-y-4">
                    <div>
                      <p><strong>1. Ổn định tổ chức: (1 - 2 phút)</strong></p>
                      <p>- Cô giới thiệu người tới dự</p>
                      <p>- Cô con mình cùng khởi động với 1 vũ điệu “ A Ram Sam Sam”.</p>
                      <p>- Cô mở nhạc bài hát cùng vận động với trẻ.</p>
                    </div>

                    <div class="pt-2">
                      <p><strong>2. Phương pháp, hình thức tổ chức: (18 - 20 phút)</strong></p>
                      <p class="font-semibold text-sky-800 mt-1">* Ôn số lượng trong phạm vi 4:</p>
                      <p>- Cho trẻ quan sát mô hình vườn cây: "Con nhìn xem có bao nhiêu quả táo đỏ trên cây?"</p>
                      <p>- Cho 1 trẻ lên chỉ và cả lớp cùng đếm.</p>
                      <p>- Cho trẻ gắn thẻ số 4 tương ứng.</p>

                      <p class="font-semibold text-sky-800 mt-2">* Tạo nhóm có số lượng 5, chữ số 5:</p>
                      <p>- Cô phát rổ đồ dùng cho từng trẻ.</p>
                      <p>- <em>Bước 1:</em> Cho trẻ xếp tất cả 5 bông hoa ra trước mặt từ trái qua phải.</p>
                      <p>- <em>Bước 2:</em> Cho trẻ lấy 4 chú bướm xếp dưới mỗi bông hoa (tương ứng 1-1).</p>
                      <p>- <em>Đặt câu hỏi mở:</em> "Các con thấy số hoa và số bướm như thế nào với nhau? Nhóm nào nhiều hơn? Nhiều hơn là mấy? Vì sao con biết?"</p>
                      <p>- "Muốn số bướm bằng số hoa ta phải làm thế nào?"</p>
                      <p>- Cho trẻ thêm 1 chú bướm.</p>
                      <p>- Cho trẻ đếm lại số bướm: "4 thêm 1 là mấy?" -&gt; Kết luận: 4 thêm 1 là 5.</p>
                      <p>- Giới thiệu chữ số 5: Cho trẻ quan sát thẻ số 5, nêu nét cấu tạo (1 nét ngang, 1 nét thẳng, 1 nét cong hở trái), cho trẻ phát âm mẫu.</p>
                    </div>

                    <div class="pt-2">
                      <p><strong>3. Luyện tập &amp; Củng cố: (5 - 6 phút)</strong></p>
                      <p>- <em>Trò chơi cá nhân: "Ai nhanh mắt"</em>: Trẻ tìm xung quanh lớp các đồ vật có gắn thẻ số 5.</p>
                      <p>- <em>Trò chơi tập thể: "Về đúng nhà"</em>: Trẻ cầm thẻ số di chuyển theo nhạc, khi nghe hiệu lệnh "Tìm nhà có 5 chấm tròn" phải chạy nhanh về đúng nhà.</p>
                    </div>

                    <div class="pt-2">
                      <p><strong>4. Kết thúc: (1 - 2 phút)</strong></p>
                      <p>- Cô nhẹ nhàng nhận xét, khen ngợi tinh thần cố gắng của cả lớp.</p>
                      <p>- Chuyển hoạt động góc nhẹ nhàng.</p>
                    </div>
                  </td>

                  <td class="p-3 align-top space-y-4">
                    <div>
                      <p>&nbsp;</p>
                      <p>- Trẻ vỗ tay chào người tới dự.</p>
                      <p>- Trẻ hào hứng chuẩn bị vận động.</p>
                      <p>- Trẻ vận động theo nhạc</p>
                    </div>

                    <div class="pt-2">
                      <p>&nbsp;</p>
                      <p class="mt-1">&nbsp;</p>
                      <p>- Trẻ quan sát và đếm: "1, 2, 3, 4 quả táo ạ!"</p>
                      <p>- 1 trẻ lên đếm và gắn thẻ số 4.</p>
                      <p>&nbsp;</p>

                      <p class="mt-2">&nbsp;</p>
                      <p>- Trẻ nhận rổ đồ dùng và xếp theo thứ tự.</p>
                      <p>- Trẻ xếp 5 bông hoa hàng ngang từ trái qua phải.</p>
                      <p>- Trẻ xếp 4 chú bướm tương ứng 1-1 dưới hoa.</p>
                      <p>- Trẻ quan sát và trả lời: "Số hoa nhiều hơn số bướm ạ. Nhiều hơn 1 vì thừa ra 1 bông hoa ạ."</p>
                      <p>- Trẻ suy nghĩ: "Thêm 1 chú bướm nữa ạ."</p>
                      <p>- Trẻ lấy thêm 1 chú bướm đặt vào.</p>
                      <p>- Cả lớp đếm: "1, 2, 3, 4, 5 chú bướm."</p>
                      <p>- Trẻ đồng thanh phát âm: "Số 5". Cá nhân trẻ phát âm tự tin.</p>
                    </div>

                    <div class="pt-2">
                      <p>&nbsp;</p>
                      <p>- Trẻ hào hứng tìm kiếm các nhóm đồ chơi có 5 đối tượng quanh lớp.</p>
                      <p>- Trẻ chơi theo đội vui vẻ, kiểm tra kết quả chéo nhau.</p>
                    </div>

                    <div class="pt-2">
                      <p>&nbsp;</p>
                      <p>- Trẻ lắng nghe cô dặn dò và cùng cô thu dọn đồ dùng gọn gàng.</p>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `,
  },
  {
    id: 'plan-sample-2',
    title: "Dạy thơ: 'Hoa cúc vàng' (Tác giả Nguyễn Văn Chương)",
    domain: 'ngon_ngu',
    domainName: 'Phát triển ngôn ngữ',
    ageGroup: '3-4t',
    ageName: 'Mẫu giáo bé (3 - 4 tuổi)',
    duration: '20 - 25 phút',
    theme: 'Thế giới Thực vật',
    subTheme: 'Bé yêu các loài hoa',
    style: 'chi_tiet',
    year: '2026–2027',
    school: 'Trường MN Sơn Đồng 3',
    className: 'Lớp Mẫu giáo 3-4 tuổi C2',
    contentHtml: `
      <div class="text-center font-bold pb-4 border-b border-slate-200">
        <h2 class="text-lg uppercase text-sky-800 tracking-wide">GIÁO ÁN PHÁT TRIỂN NGÔN NGỮ</h2>
        <p class="text-sm font-bold text-slate-800 mt-1">ĐỀ TÀI: DẠY THƠ "HOA CÚC VÀNG" (TÁC GIẢ NGUYỄN VĂN CHƯƠNG)</p>
        <div class="text-xs text-slate-700 font-semibold space-y-1 mt-2.5 text-left max-w-xs mx-auto">
          <div>Lĩnh vực: Phát triển ngôn ngữ</div>
          <div>Lứa tuổi: Mẫu giáo 3 - 4 tuổi</div>
          <div>Thời gian: 20 - 25 phút</div>
          <div>Năm học: 2026–2027</div>
        </div>
      </div>
      <div class="mt-4 space-y-4 text-xs leading-relaxed text-slate-800">
        <div>
          <h3 class="font-bold text-sm text-sky-700 uppercase">I. MỤC TIÊU BÀI HỌC</h3>
          <p><strong>1. Kiến thức:</strong> Trẻ nhớ tên bài thơ "Hoa cúc vàng", hiểu nội dung bài thơ miêu tả vẻ đẹp hoa cúc mang nắng ấm mùa xuân về xua tan mùa đông lạnh giá.</p>
          <p><strong>2. Kỹ năng:</strong> Rèn kỹ năng đọc thơ diễn cảm, phát âm rõ ràng từng từ, trả lời câu hỏi đàm thoại đủ câu, tự tin tương tác với cô.</p>
          <p><strong>3. Thái độ:</strong> Trẻ yêu quý hoa, không ngắt hoa bẻ cành nơi công cộng, biết tưới nước chăm sóc hoa tại góc thiên nhiên.</p>
        </div>
        <div>
          <h3 class="font-bold text-sm text-sky-700 uppercase">II. CHUẨN BỊ</h3>
          <p>Bình hoa cúc vàng thật để trẻ sờ và ngửi mùi hương; tranh minh họa thơ chữ to sinh động; loa nhạc nhẹ không lời.</p>
        </div>
        <div>
          <h3 class="font-bold text-sm text-sky-700 uppercase">III. TIẾN HÀNH HOẠT ĐỘNG</h3>
          <div class="overflow-x-auto my-2">
            <table class="w-full border border-slate-400 text-left border-collapse">
              <thead>
                <tr class="bg-slate-100 text-slate-900 font-bold border-b border-slate-400">
                  <th class="p-2.5 border-r border-slate-400 w-1/2 text-center">Hoạt động của cô</th>
                  <th class="p-2.5 w-1/2 text-center">Hoạt động của trẻ</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="p-3 border-r border-slate-400 align-top space-y-4">
                    <div>
                      <p><strong>1. Ổn định tổ chức: (1 - 2 phút)</strong></p>
                      <p>- Cô cho trẻ ngửi mùi hương và sờ nhẹ cánh hoa cúc vàng thật.</p>
                      <p>- Trò chuyện dẫn dắt: "Bông hoa cúc vàng rực rỡ như mang cả ánh nắng mùa xuân về với lớp mình."</p>
                    </div>

                    <div class="pt-2">
                      <p><strong>2. Phương pháp, hình thức tổ chức: (15 - 18 phút)</strong></p>
                      <p>- Cô đọc thơ diễn cảm lần 1: thể hiện sự vui tươi, ấm áp.</p>
                      <p>- Cô đọc thơ lần 2: kết hợp trình chiếu tranh minh họa.</p>
                      <p>- Đàm thoại trích dẫn làm rõ nội dung:</p>
                      <p>+ "Cô vừa đọc bài thơ gì? Do ai sáng tác?"</p>
                      <p>+ "Hoa cúc có màu gì? Nở vào mùa nào?"</p>
                      <p>- Dạy trẻ đọc thơ: Cả lớp đọc cùng cô, từng tổ, nhóm nhỏ và cá nhân trẻ lên đọc.</p>
                    </div>

                    <div class="pt-2">
                      <p><strong>3. Luyện tập &amp; Củng cố: (4 - 5 phút)</strong></p>
                      <p>- Trò chơi: "Ghép tranh hoa cúc nhanh" theo nhóm.</p>
                      <p>- Cô phổ biến luật chơi và cổ vũ các nhóm.</p>
                    </div>

                    <div class="pt-2">
                      <p><strong>4. Kết thúc: (1 - 2 phút)</strong></p>
                      <p>- Nhận xét, khen ngợi trẻ đọc thơ hay, chuyển góc hoạt động.</p>
                    </div>
                  </td>

                  <td class="p-3 align-top space-y-4">
                    <div>
                      <p>&nbsp;</p>
                      <p>- Trẻ háo hức ngửi và sờ cánh hoa cúc.</p>
                      <p>- Trẻ lắng nghe cô trò chuyện.</p>
                    </div>

                    <div class="pt-2">
                      <p>&nbsp;</p>
                      <p>- Trẻ chăm chú lắng nghe cô đọc thơ.</p>
                      <p>- Trẻ vừa nghe vừa quan sát tranh minh họa sinh động.</p>
                      <p>- Trẻ tự tin trả lời câu hỏi của cô:</p>
                      <p>+ "Bài thơ Hoa cúc vàng ạ!"</p>
                      <p>+ "Màu vàng rực rỡ ạ!"</p>
                      <p>- Cả lớp hào hứng đọc thơ diễn cảm cùng cô.</p>
                    </div>

                    <div class="pt-2">
                      <p>&nbsp;</p>
                      <p>- Trẻ cùng các bạn thảo luận và ghép tranh hoa cúc nhanh.</p>
                    </div>

                    <div class="pt-2">
                      <p>&nbsp;</p>
                      <p>- Trẻ vỗ tay vui vẻ và chuyển góc hoạt động.</p>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `,
  },
  {
    id: 'plan-sample-3',
    title: 'STEAM: Khám phá sự kỳ diệu của hạt đậu và chế tạo cốc ươm mầm tự hút nước',
    domain: 'nhan_thuc',
    domainName: 'Phát triển nhận thức (STEAM 5E)',
    ageGroup: '5-6t',
    ageName: 'Mẫu giáo lớn (5 - 6 tuổi)',
    duration: '30 - 35 phút',
    theme: 'Thế giới Thực vật',
    subTheme: 'Sự nảy mầm kỳ diệu',
    style: 'steam',
    year: '2026–2027',
    school: 'Trường MN Sơn Đồng 3',
    className: 'Lớp Mẫu giáo 5-6 tuổi A1',
    contentHtml: `
      <div class="text-center font-bold pb-4 border-b border-slate-200">
        <h2 class="text-lg uppercase text-emerald-800 tracking-wide">GIÁO ÁN ỨNG DỤNG MÔ HÌNH STEAM (QUY TRÌNH 5E)</h2>
        <p class="text-sm font-bold text-slate-800 mt-1">ĐỀ TÀI: CHẾ TẠO CỐC ƯƠM HẠT TỰ HÚT NƯỚC TỪ VỎ CHAI NHỰA TÁI CHẾ</p>
        <div class="text-xs text-slate-700 font-semibold space-y-1 mt-2.5 text-left max-w-xs mx-auto">
          <div>Lĩnh vực: Phát triển nhận thức (STEAM)</div>
          <div>Lứa tuổi: Mẫu giáo 5 - 6 tuổi</div>
          <div>Thời gian: 30 - 35 phút</div>
          <div>Năm học: 2026–2027</div>
        </div>
      </div>
      <div class="mt-4 space-y-4 text-xs leading-relaxed text-slate-800">
        <div>
          <h3 class="font-bold text-sm text-emerald-700 uppercase">I. YẾU TỐ STEAM TÍCH HỢP</h3>
          <p>• <strong>S (Science - Khoa học):</strong> Trẻ biết hạt đậu cần nước, không khí và ánh sáng để nảy mầm sinh trưởng.</p>
          <p>• <strong>T (Technology - Công nghệ):</strong> Sử dụng dây sợi cotton mao dẫn dẫn nước tự động.</p>
          <p>• <strong>E (Engineering - Kỹ thuật):</strong> Quy trình cắt đôi vỏ chai nhựa an toàn, luồn dây và nhồi giá thể xơ dừa.</p>
          <p>• <strong>A (Art - Nghệ thuật):</strong> Vẽ trang trí mắt, miệng vui nhộn lên thân cốc ươm.</p>
          <p>• <strong>M (Math - Toán học):</strong> Đếm đúng 5 hạt đậu để gieo, đo mực nước trong đáy cốc.</p>
        </div>
        <div>
          <h3 class="font-bold text-sm text-emerald-700 uppercase">II. CÁC BƯỚC QUY TRÌNH 5E</h3>
          <p><strong>1. Gắn kết (Engage):</strong> Xem đoạn video ngắn về bạn Hạt Đậu khát nước khi cả lớp nghỉ cuối tuần.</p>
          <p><strong>2. Khám phá (Explore):</strong> Trẻ thí nghiệm sợi vải nhúng nước xem hiện tượng dẫn nước lên trên.</p>
          <p><strong>3. Giải thích (Explain):</strong> Cô và trẻ cùng chia sẻ cách dẫn nước mao dẫn.</p>
          <p><strong>4. Áp dụng (Elaborate):</strong> Các nhóm trẻ tự tay thực hiện cốc ươm hạt tự hút nước.</p>
          <p><strong>5. Đánh giá (Evaluate):</strong> Trẻ thuyết trình sản phẩm, quan sát độ ẩm của giá thể xơ dừa.</p>
        </div>
      </div>
    `,
  },
  {
    id: 'plan-sample-4',
    title: 'Bò chui qua cổng - Trò chơi: Nhảy vào vòng tròn màu sắc',
    domain: 'the_chat',
    domainName: 'Phát triển thể chất',
    ageGroup: '24-36m',
    ageName: 'Nhà trẻ (24 - 36 tháng)',
    duration: '15 - 20 phút',
    theme: 'Giao thông & Đồ chơi của bé',
    subTheme: 'Bé khỏe bé ngoan',
    style: 'chi_tiet',
    year: '2026–2027',
    school: 'Trường MN Sơn Đồng 3',
    className: 'Nhóm trẻ 24-36 tháng D1',
    contentHtml: `
      <div class="text-center font-bold pb-4 border-b border-slate-200">
        <h2 class="text-lg uppercase text-rose-700 tracking-wide">GIÁO ÁN PHÁT TRIỂN THỂ CHẤT NHÀ TRẺ</h2>
        <p class="text-sm font-bold text-slate-800 mt-1">VẬN ĐỘNG CƠ BẢN: BÒ CHUI QUA CỔNG • TCVĐ: NHẢY VÀO VÒNG</p>
        <div class="text-xs text-slate-700 font-semibold space-y-1 mt-2.5 text-left max-w-xs mx-auto">
          <div>Lĩnh vực: Thể chất</div>
          <div>Lứa tuổi: Nhà trẻ 24 - 36 tháng</div>
          <div>Thời gian: 15 - 20 phút</div>
          <div>Năm học: 2026–2027</div>
        </div>
      </div>
      <div class="mt-4 space-y-4 text-xs leading-relaxed text-slate-800">
        <div>
          <h3 class="font-bold text-sm text-rose-700 uppercase">I. MỤC TIÊU BÀI HỌC</h3>
          <p>Trẻ biết bò bằng bàn tay và cẳng chân khéo léo, đầu không chạm cổng; trẻ hào hứng vận động, phát triển cơ bắp chân tay và khả năng định hướng không gian.</p>
        </div>
        <div>
          <h3 class="font-bold text-sm text-rose-700 uppercase">II. CHUẨN BỊ</h3>
          <p>Cổng chui bọc xốp mềm an toàn cao 45cm; thảm trải mềm chống trơn trượt; vòng thể dục nhiều màu sắc; bài hát thiếu nhi vui nhộn.</p>
        </div>
        <div>
          <h3 class="font-bold text-sm text-rose-700 uppercase">III. TIẾN HÀNH HOẠT ĐỘNG</h3>
          <div class="overflow-x-auto my-2">
            <table class="w-full border border-slate-400 text-left border-collapse">
              <thead>
                <tr class="bg-slate-100 text-slate-900 font-bold border-b border-slate-400">
                  <th class="p-2.5 border-r border-slate-400 w-1/2 text-center">Hoạt động của cô</th>
                  <th class="p-2.5 w-1/2 text-center">Hoạt động của trẻ</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="p-3 border-r border-slate-400 align-top space-y-4">
                    <div>
                      <p><strong>1. Ổn định tổ chức: (1 - 2 phút)</strong></p>
                      <p>- Cô và trẻ làm các chú mèo con đi kiễng chân, lắc đuôi nhẹ nhàng theo nhạc.</p>
                    </div>

                    <div class="pt-2">
                      <p><strong>2. Phương pháp, hình thức tổ chức: (10 - 12 phút)</strong></p>
                      <p>- Cô làm mẫu rõ ràng, nhấn mạnh mắt nhìn về phía trước, không cúi đầu cộc cổng.</p>
                      <p>- Cho từng trẻ bò, cô động viên ôm ấp trẻ nhút nhát.</p>
                    </div>

                    <div class="pt-2">
                      <p><strong>3. Luyện tập &amp; Củng cố: (3 - 4 phút)</strong></p>
                      <p>- Trò chơi: "Nhảy vào vòng tròn màu sắc".</p>
                    </div>

                    <div class="pt-2">
                      <p><strong>4. Kết thúc (Hồi tĩnh): (1 - 2 phút)</strong></p>
                      <p>- Đi lại nhẹ nhàng giả làm chim bay về tổ.</p>
                    </div>
                  </td>

                  <td class="p-3 align-top space-y-4">
                    <div>
                      <p>&nbsp;</p>
                      <p>- Trẻ làm chú mèo con vui nhộn theo cô.</p>
                    </div>

                    <div class="pt-2">
                      <p>&nbsp;</p>
                      <p>- Trẻ chú ý nhìn cô làm mẫu.</p>
                      <p>- Từng trẻ tự tin thực hiện bài tập bò chui qua cổng.</p>
                    </div>

                    <div class="pt-2">
                      <p>&nbsp;</p>
                      <p>- Trẻ hào hứng nhảy vào vòng màu sắc.</p>
                    </div>

                    <div class="pt-2">
                      <p>&nbsp;</p>
                      <p>- Trẻ đi lại nhẹ nhàng hít thở không khí trong lành.</p>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `,
  },
];

export const RECYCLED_MATERIALS = [
  {
    category: 'Vật Liệu Tái Chế An Toàn',
    items: [
      {
        title: 'Nắp chai nhựa các màu',
        desc: 'Dùng đếm số lượng, phân loại màu sắc, xếp hình bông hoa, ghép chữ cái, làm bánh xe chuyển động.',
      },
      {
        title: 'Lõi giấy vệ sinh sạch',
        desc: 'Làm thân cây mùa xuân, ống dòm khám phá thiên nhiên, đường ray trượt bóng mini STEAM.',
      },
      {
        title: 'Hộp sữa chua khử khuẩn',
        desc: 'Làm chậu gieo hạt đỗ, chuông gió phát ra âm thanh khi đựng sỏi nhỏ, cốc đo lường dung tích.',
      },
      {
        title: 'Hạt gấc & Vỏ ngao rửa sạch',
        desc: 'Đồ dùng gắp đũa rèn vận động tinh ngón tay, tạo hình con rùa con cua biển.',
      },
    ],
  },
  {
    category: 'Học Liệu Số & Âm Nhạc Gợi Ý',
    items: [
      {
        title: 'Bài hát đón trẻ & Vận động',
        desc: '"Lời chào buổi sáng", "Em đi mẫu giáo", "Bé ngoan rửa tay", "Đố bạn", "Màu hoa".',
      },
      {
        title: 'Video khoa học ngắn (1-2 phút)',
        desc: 'Vòng đời phát triển của hạt đậu (time-lapse không lời), tiếng kêu các con vật trong rừng.',
      },
      {
        title: 'Âm thanh thư giãn giờ ngủ trưa',
        desc: 'Tiếng suối chảy nhẹ nhàng, tiếng chim rừng líu lo, nhạc piano không lời ru bé ngủ.',
      },
    ],
  },
  {
    category: 'Tiêu Chuẩn An Toàn Mầm Non',
    items: [
      {
        title: 'Kích thước an toàn tuyệt đối',
        desc: 'Tuyệt đối không dùng đồ chơi, hạt nhỏ hơn 3cm cho trẻ dưới 3 tuổi đề phòng hóc dị vật nguy hiểm.',
      },
      {
        title: 'Khử khuẩn định kỳ',
        desc: 'Đồ dùng tự chế phải rửa xà phòng, phơi nắng khô ráo hoặc khử cồn y tế an toàn.',
      },
      {
        title: 'Bảo vệ cạnh góc',
        desc: 'Không sử dụng chai nhựa giòn dễ vỡ, bọc băng dính viền mép để không gây trầy xước tay trẻ.',
      },
    ],
  },
];
