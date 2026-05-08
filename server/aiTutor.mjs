const SCIENCE_SYSTEM_PROMPT = `
أنت مساعد علوم تعليمي عربي لطالبات المرحلة المتوسطة في السعودية.
قدمي إجابات دقيقة ومبسطة ومباشرة، واربطي الإجابة بمنهج العلوم للصف الأول أو الثالث متوسط عند ظهور سياق مناسب.
استخدمي نبرة مشجعة ومحترفة، ولا تطيلي إلا إذا طلبت الطالبة شرحًا تفصيليًا.
إذا كان السؤال تجربة عملية، اذكري أدوات آمنة وخطوات قصيرة وتنبيه أمان مناسب.
إذا كان السؤال اختبارًا أو مذاكرة، قدمي خطة عملية أو أسئلة تدريبية.
لا تقدمي معلومات خطرة أو تعليمات كهربائية منزلية؛ استخدمي بطاريات منخفضة الجهد فقط في التجارب.
`;

export function fallbackTutorAnswer(question) {
  const normalized = String(question || "").toLowerCase();
  if (normalized.includes("قوة") || normalized.includes("حركة") || normalized.includes("تسارع")) {
    return "القوة دفع أو سحب يؤثر في حركة الجسم. إذا زادت القوة المحصلة مع ثبات الكتلة يزداد تغير الحركة غالبًا. جربي في المختبر تغيير مقدار القوة وملاحظة سرعة العربة.";
  }
  if (normalized.includes("خطة") || normalized.includes("مراجعة") || normalized.includes("اذاكر") || normalized.includes("أذاكر")) {
    return "خطة مراجعة مقترحة: ابدئي بقراءة هدف الدرس، ثم افتحي النشاط التفاعلي، وبعده اكتبي توقعًا في دفتر الباحثة، ثم حلي الاختبار القصير. إذا كانت نتيجتك أقل من 80% فراجعي بطاقات المفاهيم قبل الاختبار الشامل.";
  }
  if (normalized.includes("تجربة") || normalized.includes("مختبر") || normalized.includes("آمنة") || normalized.includes("امنة")) {
    return "تجربة آمنة مقترحة: استخدمي عربة صغيرة أو علبة خفيفة، سطحًا أملس، ومسطرة. ادفعي العربة بقوة قليلة ثم بقوة أكبر، وسجلي المسافة التي قطعتها في كل مرة. الاستنتاج المتوقع: زيادة القوة تجعل تغير الحركة أوضح عند ثبات باقي العوامل.";
  }
  if (normalized.includes("كهرب") || normalized.includes("دائرة") || normalized.includes("مصباح")) {
    return "الدائرة الكهربائية تحتاج مسارًا مغلقًا لمرور التيار. عند إغلاق المفتاح يضيء المصباح، وعند فتحه ينقطع المسار. استخدمي بطاريات منخفضة الجهد فقط في التجارب.";
  }
  if (normalized.includes("زلزال") || normalized.includes("بركان") || normalized.includes("صفائح")) {
    return "تحدث الزلازل غالبًا عند حدود الصفائح بسبب تراكم الطاقة في الصخور ثم تحررها فجأة، أما البراكين فتنتج عند صعود الصهارة والغازات إلى السطح.";
  }
  if (normalized.includes("خلية") || normalized.includes("وراث") || normalized.includes("dna") || normalized.includes("جين")) {
    return "الخلية وحدة البناء والوظيفة في الكائن الحي، وتحتوي النواة على DNA. الجينات أجزاء من DNA تؤثر في الصفات الوراثية التي تنتقل بين الأجيال.";
  }
  return "سؤال جميل. حددي اسم الدرس أو المفهوم العلمي، مثل القوة أو الخلية أو الكهرباء أو الزلازل، وسأشرح لك بخطوات واضحة مع مثال ونشاط مناسب.";
}

function extractResponseText(data) {
  if (typeof data?.output_text === "string" && data.output_text.trim()) return data.output_text.trim();
  const text = data?.output
    ?.flatMap((item) => item?.content ?? [])
    ?.map((content) => content?.text)
    ?.filter(Boolean)
    ?.join("\n");
  return text?.trim() || "";
}

export async function handleTutorRequest(payload, env = process.env) {
  const question = String(payload?.question || "").trim();
  const context = payload?.context ?? {};
  if (!question) {
    return { status: 400, body: { error: "question_required", answer: "اكتبي سؤالك العلمي أولًا." } };
  }

  const apiKey = env.OPENAI_API_KEY;
  if (!apiKey) {
    return {
      status: 200,
      body: {
        provider: "fallback",
        answer: fallbackTutorAnswer(question),
      },
    };
  }

  const model = env.OPENAI_MODEL || "gpt-4.1-mini";
  const input = [
    {
      role: "developer",
      content: SCIENCE_SYSTEM_PROMPT,
    },
    {
      role: "user",
      content: `السؤال: ${question}

سياق المنصة:
${JSON.stringify(context, null, 2)}`,
    },
  ];

  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      input,
      max_output_tokens: 550,
      temperature: 0.35,
      store: false,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text().catch(() => "");
    return {
      status: 200,
      body: {
        provider: "fallback",
        warning: "openai_request_failed",
        details: errorText.slice(0, 300),
        answer: fallbackTutorAnswer(question),
      },
    };
  }

  const data = await response.json();
  const answer = extractResponseText(data) || fallbackTutorAnswer(question);
  return {
    status: 200,
    body: {
      provider: "openai",
      answer,
    },
  };
}
