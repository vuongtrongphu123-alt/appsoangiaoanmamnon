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
                      <p><strong>1. Ổn định tổ chức &amp; Gây hứng thú: (2 - 3 phút)</strong></p>
                      <p>- Cô tươi cười, ân cần cúi xuống đón trẻ: "Nhiệt liệt chào đón các bạn nhỏ đáng yêu của lớp Mẫu giáo 4 - 5 tuổi đến với ngày hội 'Toán học vui nhộn' hôm nay!"</p>
                      <p>- Cô giới thiệu các cô giáo trong Ban Giám khảo tới dự bằng giọng hào hứng: "Đến dự với lớp mình hôm nay có các cô giáo vô cùng xinh đẹp, chúng mình cùng nổ một tràng pháo tay thật giòn giã để chào đón các cô nào!"</p>
                      <p>- <em>Tạo tình huống bất ngờ:</em> Tiếng nhạc vui nhộn "A Ram Sam Sam" vang lên, cô và trẻ cùng hòa mình nhún nhảy, làm các động tác lắc lư vui tươi.</p>
                      <p>- <em>Lời dẫn đàm thoại:</em> "Các con ơi, hôm nay bạn Thỏ Trắng từ khu rừng mùa xuân có gửi tặng lớp mình một giỏ quà bí mật. Bạn Thỏ bảo ai tinh mắt và đếm giỏi sẽ nhận được những điều bất ngờ đấy. Chúng mình cùng bắt đầu khám phá nhé!"</p>
                    </div>

                    <div class="pt-2">
                      <p><strong>2. Phương pháp, hình thức tổ chức: (18 - 20 phút)</strong></p>
                      <p class="font-semibold text-sky-800 mt-1">* Hoạt động 1: Ôn số lượng trong phạm vi 4</p>
                      <p>- Cô hướng trẻ về mô hình khu vườn mùa xuân: "Các con hãy nhìn xem trong vườn nhà bạn Thỏ có những cây gì đang đơm hoa kết trái nào?"</p>
                      <p>- <em>Hệ thống câu hỏi gợi mở:</em></p>
                      <p>&nbsp;&nbsp;+ "Trên cây táo đỏ có bao nhiêu quả đang chín mọng? Ai giỏi lên chỉ và đếm giúp cô nào?"</p>
                      <p>&nbsp;&nbsp;+ Cô mời 1 trẻ lên dùng que chỉ, đếm từ trái qua phải to rõ ràng: 1, 2, 3, 4 quả táo. Cả lớp đếm kiểm tra lại.</p>
                      <p>&nbsp;&nbsp;+ "Để biểu thị cho 4 quả táo đỏ, con sẽ chọn thẻ số mấy?" (Cô mời trẻ tìm thẻ số 4 gắn tương ứng).</p>
                      <p>- Cô cho trẻ tìm thêm nhóm hoa/chú chim có số lượng 3, 4 trong lớp để khắc sâu kiến thức.</p>

                      <p class="font-semibold text-sky-800 mt-2">* Hoạt động 2: Tạo nhóm có số lượng 5, đếm đến 5 và nhận biết chữ số 5</p>
                      <p>- Cô nhẹ nhàng chuyển đội hình: Cô đọc câu đố về các loài hoa, trẻ nhẹ nhàng đi về bàn lấy rổ học liệu đặt ngay ngắn trước mặt.</p>
                      <p>- <em>Bước 1: Tạo nhóm 5 đối tượng:</em></p>
                      <p>&nbsp;&nbsp;+ Cô hướng dẫn: "Các con hãy dùng đôi tay khéo léo lấy tất cả những bông hoa màu đỏ rực rỡ trong rổ ra và xếp thành một hàng ngang từ trái qua phải thật thẳng hàng nhé!" (Cô quan sát, nhắc nhở trẻ tư thế ngồi thẳng lưng).</p>
                      <p>- <em>Bước 2: Xếp tương ứng 1 - 1:</em></p>
                      <p>&nbsp;&nbsp;+ "Bây giờ, các con hãy lấy 4 chú bướm xinh đẹp ra, dưới mỗi bông hoa các con xếp tương ứng 1 chú bướm (xếp từ trái qua phải)."</p>
                      <p>- <em>Bước 3: So sánh số lượng 2 nhóm (Hệ thống câu hỏi kích thích tư duy):</em></p>
                      <p>&nbsp;&nbsp;+ "Các con quan sát xem số hoa và số bướm lúc này như thế nào với nhau?"</p>
                      <p>&nbsp;&nbsp;+ "Nhóm nào nhiều hơn? Nhiều hơn là mấy? Vì sao con biết?" (Cô khích lệ: Con giỏi lắm, nhiều hơn 1 vì thừa ra 1 bông hoa chưa có bạn bướm đậu).</p>
                      <p>&nbsp;&nbsp;+ "Nhóm nào ít hơn? Ít hơn là mấy? Vì sao?"</p>
                      <p>&nbsp;&nbsp;+ "Bây giờ muốn số bướm nhiều bằng số hoa thì chúng mình phải làm cách nào? Ai có ý kiến hay nào?"</p>
                      <p>- Cô lắng nghe các phương án của trẻ và chốt lại: "Đúng rồi, chúng mình hãy lấy thêm 1 chú bướm nữa xếp dưới bông hoa còn lại nhé!"</p>
                      <p>- <em>Bước 4: Tạo sự bằng nhau và nhận biết số 5:</em></p>
                      <p>&nbsp;&nbsp;+ "4 chú bướm thêm 1 chú bướm là mấy chú bướm?" -&gt; Cô khẳng định: "4 thêm 1 là 5". Cho cả lớp nhắc lại.</p>
                      <p>&nbsp;&nbsp;+ Cho trẻ chỉ tay đếm số hoa: 1, 2, 3, 4, 5 bông hoa. Đếm số bướm: 1, 2, 3, 4, 5 chú bướm.</p>
                      <p>&nbsp;&nbsp;+ "Như vậy lúc này số hoa và số bướm như thế nào với nhau? Và cùng bằng mấy?"</p>
                      <p>- <em>Bước 5: Giới thiệu chữ số 5:</em></p>
                      <p>&nbsp;&nbsp;+ "Để chỉ nhóm có 5 đối tượng như 5 bông hoa, 5 chú bướm, người ta dùng chữ số 5."</p>
                      <p>&nbsp;&nbsp;+ Cô giơ thẻ số 5 to, phát âm mẫu rõ ràng 3 lần: "Số 5".</p>
                      <p>&nbsp;&nbsp;+ Cho cả lớp phát âm, từng tổ, nhóm, cá nhân trẻ phát âm (cô chú ý sửa ngọng, động viên trẻ phát âm tròn vành rõ chữ).</p>
                      <p>&nbsp;&nbsp;+ <em>Phân tích nét chữ số 5 bằng hình tượng sinh động:</em> "Các con nhìn xem chữ số 5 có cấu tạo gồm những nét gì? À, số 5 gồm 1 nét ngang ở trên như chiếc mũ, 1 nét thẳng ngắn ở bên trái, và 1 nét cong hở trái phía dưới giống như chiếc bụng béo đáng yêu đấy!"</p>
                      <p>&nbsp;&nbsp;+ Cô cho trẻ dùng ngón trỏ tay phải vẽ chữ số 5 trên không trung và sờ đường viền nổi trên thẻ số.</p>
                      <p>&nbsp;&nbsp;+ Cho trẻ chọn thẻ số 5 trong rổ đặt vào cạnh nhóm hoa và nhóm bướm.</p>
                      <p>- <em>Bước 6: Bớt dần và cất đồ dùng:</em> Cho bớt lần lượt 1, 2 chú bướm, đếm lại và cất đồ dùng theo nhịp bài hát nhẹ nhàng.</p>
                    </div>

                    <div class="pt-2">
                      <p><strong>3. Luyện tập &amp; Củng cố: (6 - 8 phút)</strong></p>
                      <p><strong>* Trò chơi 1: "Đôi mắt tinh nhanh"</strong></p>
                      <p>- Cô giới thiệu trò chơi "Đôi mắt tinh nhanh" và phổ biến cách chơi và luật chơi.</p>
                      <p>+ <em>Cách chơi:</em> Mỗi bạn chú ý lắng nghe cô vỗ tay hoặc quan sát xung quanh lớp xem góc nào có nhóm 5 đồ dùng đồ chơi thì chạy nhanh đến và chỉ tay đếm to.</p>
                      <p>+ <em>Luật chơi:</em> Phải tìm đúng nhóm có đủ 5 đối tượng. Bạn nào tìm nhanh và đúng nhất sẽ được cả lớp thưởng một tràng pháo tay giòn giã.</p>
                      <p>- Tổ chức cho trẻ chơi:</p>
                      <p>Lần 1: Trẻ đếm tiếng vỗ tay và giơ thẻ số 5 tại chỗ.</p>
                      <p>Lần 2: Trẻ tìm các nhóm có 5 đồ vật xung quanh các góc lớp.</p>
                      <p>- Cô nhận xét kết quả, động viên, tuyên dương trẻ sau trò chơi.</p>

                      <p class="pt-2"><strong>* Trò chơi 2 (Vận động): "Chung sức tiếp sức"</strong></p>
                      <p>- Cô giới thiệu trò chơi "Chung sức tiếp sức" và phổ biến cách chơi và luật chơi.</p>
                      <p>+ <em>Cách chơi:</em> Mỗi bạn lấy 1 thẻ hình và về 2 hàng dọc tương ứng với 2 đội chơi. Khi bản nhạc cất lên, từng bạn đầu hàng sẽ bật nhảy qua 3 ô vòng thể dục, chọn đúng thẻ hình có nhóm 5 đối tượng gắn lên bảng thi đua của đội mình, sau đó chạy về đập tay vào bạn tiếp theo.</p>
                      <p>+ <em>Luật chơi:</em> Khi thực hiện phải bật khéo léo không giẫm vào mép vòng, mỗi lượt chỉ gắn 1 thẻ hình. Khi trò chơi kết thúc đội nào gắn đúng và nhiều hơn sẽ là đội chiến thắng.</p>
                      <p>- Tổ chức cho trẻ chơi:</p>
                      <p>Lần 1: Trẻ thi đua tiếp sức bật nhảy qua 3 ô vòng.</p>
                      <p>Lần 2: Trẻ đổi vị trí và nâng cao tốc độ theo giai điệu nhạc.</p>
                      <p>- Cô nhận xét kết quả, động viên, tuyên dương trẻ sau trò chơi.</p>
                    </div>

                    <div class="pt-2">
                      <p><strong>4. Kết thúc &amp; Chuyển tiếp hoạt động: (1 - 2 phút)</strong></p>
                      <p>- Cô ân cần nhận xét: "Hôm nay cô thấy bạn nào học cũng rất chăm chỉ, biết đếm giỏi, trả lời câu hỏi to rõ ràng và tham gia trò chơi rất đoàn kết. Cô khen tất cả các con một tràng pháo tay thật lớn!"</p>
                      <p>- Nhắc nhở trẻ nhẹ nhàng mang đồ dùng xếp ngay ngắn vào rổ, chuyển sang hoạt động góc trong tiếng hát bài 'Màu hoa'.</p>
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
