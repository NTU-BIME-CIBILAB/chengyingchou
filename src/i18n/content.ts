import type { Domain } from '../types';

// Language-independent structured content (Spec §6, §8, §11).
// Each record carries both languages; components render the active one.
// PI bio is static here per README §10 (not in Google Sheets).

export interface BiPair {
  en: string;
  zh: string;
}

export interface EducationEntry {
  years: string;
  role: BiPair;
  institution: BiPair; // institution.en === '' -> omit line
}

export interface InterestTag {
  label: BiPair;
  domain: Exclude<Domain, 'NA'>;
}

export const PI = {
  photo: 'chou-cheng-ying.png',
  name: { en: 'Prof. Cheng-Ying Chou', zh: '周呈霙 教授' } as BiPair,
  dept: {
    en: 'Department of Biomechatronics Engineering, NTU',
    zh: '國立臺灣大學　生物機電工程學系',
  } as BiPair,
  jointAppointments: [
    {
      en: 'Master Program in Statistics',
      zh: '統計碩士學位學程',
    },
    {
      en: 'Medical Devices and Imaging System',
      zh: '醫療器材與醫學影像研究所',
    },
    {
      en: 'Global Undergraduate Program in Semiconductors',
      zh: '國際半導體學士學位學程',
    },
  ] as BiPair[],
  education: [
    {
      years: '2007–present',
      role: { en: 'Faculty', zh: '教職' },
      institution: {
        en: 'National Taiwan University, Biomechatronics Engineering',
        zh: '國立臺灣大學，生物機電工程學系',
      },
    },
    {
      years: '2005–2007',
      role: { en: 'Senior Research Scientist', zh: '資深研究員' },
      institution: {
        en: 'Illinois Institute of Technology, Biomedical Engineering',
        zh: '伊黎諾理工學院，生物醫學工程系',
      },
    },
    {
      years: '2000–2005',
      role: { en: 'Ph.D.', zh: '博士' },
      institution: {
        en: 'Rice University, Chemical Engineering',
        zh: '萊斯大學，化學工程學系',
      },
    },
  ] as EducationEntry[],
  interests: [
    {
      label: { en: 'Medical Imaging AI', zh: '醫療影像AI技術開發' },
      domain: 'Medical Image',
    },
    {
      label: { en: 'X-ray Phase Contrast Imaging', zh: 'X光相位對比成像' },
      domain: 'Medical Image',
    },
    {
      label: { en: 'CT Image Reconstruction', zh: '電腦斷層掃描影像重建' },
      domain: 'Medical Image',
    },
    {
      label: { en: 'Agricultural AI Applications', zh: '人工智慧之農業應用' },
      domain: 'Smart Agriculture',
    },
    {
      label: { en: 'Rapid Diagnostic Kit Development', zh: '快篩檢測試劑研發' },
      domain: 'Biosensing',
    },
  ] as InterestTag[],
  courses: [
    {
      en: 'Experimental Design and Analysis in Engineering',
      zh: '試驗設計之工程應用',
    },
    { en: 'Probability and Statistics', zh: '機率與統計' },
    {
      en: 'Exploratory Multivariate Data Analysis',
      zh: '探索式多變量資料分析',
    },
    { en: 'Random Signal Analysis', zh: '隨機訊號分析' },
  ] as BiPair[],
  contact: {
    tel: '+886-2-3366-9689',
    fax: '+886-2-2362-7620',
    email: 'chengying@ntu.edu.tw',
  },
};

// Research page content blocks (Spec §8). Each domain is a list of blocks
// rendered top-to-bottom — heading / text / image / video — so a domain reads
// like a short blog: one heading+text(+media) group per research project,
// in display order. Mix and order them freely. ZH text pending for some
// (Spec §17); when a text block's zh is '', the render falls back to en.
//   - heading: a project title, rendered as a sub-heading above its text
//   - image: a file under public/assets/research/   e.g. src: 'ct-pipeline.png'
//   - video: a YouTube video ID                     e.g. youtube: 'dQw4w9WgXcQ'
//   - text.links: wraps exact substrings (matched post-escaping) in an <a>,
//     e.g. links: [{ text: 'SmarTest R&D Center', href: 'https://...' }]
export type ResearchBlock =
  | { type: 'heading'; en: string; zh: string }
  | {
      type: 'text';
      en: string;
      zh: string;
      links?: { text: string; href: string }[];
    }
  | { type: 'image'; src: string; alt?: string; caption?: BiPair }
  | { type: 'video'; youtube: string; caption?: BiPair };

export const DOMAIN_CONTENT: Record<Exclude<Domain, 'NA'>, ResearchBlock[]> = {
  'Medical Image': [
    {
      type: 'heading',
      en: 'Early Oral Cancer Detection System',
      zh: '口腔癌早期篩檢系統',
    },
    { type: 'image', src: 'oral_cancer.png' },
    {
      type: 'text',
      en: `Early-stage oral cancer screening relies heavily on physicians' visual observation and palpation, making the diagnostic process time-consuming and highly dependent on subjective clinical expertise; mobile-based screening is likewise susceptible to variations in capture position, field-of-view completeness, and image quality, which can compromise interpretation accuracy. To provide a more objective, convenient, and highly accurate clinical support tool, we developed an integrated oral lesion early screening algorithm spanning image quality control through to lesion risk assessment. This algorithm first automatically verifies whether the user has provided complete and correctly positioned images of each oral region, then automatically marks the location of potential lesions and assigns a risk grade based on severity. This research has now progressed into a fully developed mobile application, intended to serve as an intelligent support tool for preliminary clinical screening of oral cancer.`,
      zh: `早期口腔癌的篩檢高度依賴醫師的肉眼觀察與觸診，診斷過程因此耗時並極具主觀經驗的專業門檻；行動式拍攝篩檢亦容易因拍攝位置、視野完整度與影像品質不一而影響判讀準確性。為提供更客觀、便利且高準確度的臨床輔導工具，我們研發出一套從影像品質把關到病灶風險評估之整合式口腔病灶早期篩檢演算法。該演算法首先自動辨識使用者是否完整並正確提供口腔各部位影像，再行自動標示潛在病灶位置並依嚴重程度進行風險分級。本研究如今已進展為完整的行動應用程式，期望作為口腔癌臨床初步篩檢之智慧輔助工具。`,
    },
    {
      type: 'heading',
      en: 'Cardiovascular Image Analysis and Non-Invasive Hemodynamic Simulation',
      zh: '心血管影像分析與非侵入性血液動力學模擬',
    },
    { type: 'image', src: 'cardiovascular.png' },
    {
      type: 'text',
      en: `To address coronary artery disease, the leading cause of mortality worldwide, and enhance clinical diagnostic efficacy, integrating computed tomography and angiography with hemodynamic simulation has demonstrated critical potential for non-invasive precision medicine. To this end, our team developed a cardiovascular image registration and reconstruction algorithm that integrates coronary computed tomography angiography (CCTA) with coronary angiography (CAG). This algorithm precisely fuses plaque information from computed tomography with the vessel diameter advantages of angiography, and has recently incorporated state-of-the-art deep learning techniques to automate coronary artery segmentation in CT images; in parallel, the system couples computational fluid dynamics (CFD) with biological anatomical parameter estimation methods to precisely simulate intravascular pressure fields and calculate the clinically critical fractional flow reserve (FFR).`,
      zh: `為因應全球致命率最高之冠狀動脈疾病並提升臨床診斷效益，將電腦斷層與血管造影結合血液動力學模擬，已展現非侵入性精準醫療的關鍵潛力。為此，本團隊開發了一套整合電腦斷層冠狀動脈血管攝影（CCTA）與冠狀動脈造影（CAG）之心血管影像對位與重建演算法。該演算法精準融合斷層掃描之斑塊資訊與造影之管徑優勢，近期更導入最新深度學習技術以自動化分割 CT 影像冠狀動脈；同時，系統偕同計算流體力學（CFD）與生體解剖參數推估方法，可精準模擬血管內壓力場並計算關鍵之血流儲備分數（FFR）。`,
    },
    {
      type: 'heading',
      en: 'Pelvic CT-Assisted Opportunistic Prostate Cancer Screening',
      zh: '腹盆腔CT影像輔助攝護腺癌機會性篩檢',
    },
    { type: 'image', src: 'prostate.png' },
    {
      type: 'text',
      en: `Pelvic CT scans are frequently performed for reasons unrelated to the prostate, such as vascular disease, abdominal symptoms, or evaluation of other tumors, and often incidentally cover the prostate region, yet these images are rarely systematically examined for potential prostate cancer lesions. Compared with MRI, CT offers lower contrast resolution for prostate soft tissue, making lesion boundaries more difficult to discern, and since scan protocols are not designed for prostate evaluation, such images have long remained underutilized for early prostate cancer detection. We aim to introduce advanced computer vision techniques to assist opportunistic prostate cancer screening on CT images, sparing patients the need for additional dedicated examinations and the associated radiation exposure this would entail.`,
      zh: `腹盆腔CT掃描常因血管疾病、腹部症狀或其他腫瘤評估等與攝護腺無關的原因而施行，這些影像中往往附帶涵蓋攝護腺區域，卻極少被系統性地檢視是否存在攝護腺癌病灶。相比MRI影像，CT影像對攝護腺軟組織的對比解析度較低、病灶邊界不易辨識，又掃描條件並非為攝護腺評估而設計，使得這類影像長期以來未被充分利用於攝護腺癌的早期預警。我們期望導入先進電腦視覺技術，以CT影像輔助攝護腺癌機會性篩檢，使病患無須為攝護腺癌篩檢額外安排檢查，也無須因此承受額外的輻射暴露。`,
    },
    {
      type: 'heading',
      en: 'Positron Emission Tomography Image Reconstruction and Software Interface Development',
      zh: '正子造影影像重建與軟體介面開發',
    },
    { type: 'image', src: 'pet.png' },
    {
      type: 'text',
      en: `In clinical nuclear medicine, administering ultra-low-dose radiotracers has become an inevitable trend for reducing patients' exposure to ionizing radiation, but this also results in positron emission tomography (PET) images plagued by severe noise. We developed a general-purpose blind medical image denoising algorithm. This algorithm autonomously estimates the degree of degradation directly from image content and performs restoration, without requiring prior knowledge of the patient's body type, scanner model, or administered dose ratio, with the aim of helping physicians obtain highly reliable diagnostic evidence under low radiation dose conditions that safeguard patient safety.`,
      zh: `在臨床核子醫學中，為了降低電離輻射對病人的健康風險，施打超低劑量放射性示蹤劑已成為必然趨勢，但這也導致拍攝出的正子造影（PET）影像充滿嚴重噪聲。我們研發出一套通用型盲醫學影像去噪演算法。該演算法不需要事先得知病人的體型、掃描儀型號或施打的劑量比例，即可從影像內容自主推估受損程度並進行修復，期望能協助醫師在兼顧病人安全的低輻射劑量前提下，獲得高可靠性的精準診斷依據。`,
    },
    {
      type: 'heading',
      en: 'AED Pad Placement Quality Assessment System',
      zh: 'AED 電擊貼片放置品質評估系統',
    },
    { type: 'image', src: 'aed.png' },
    {
      type: 'text',
      en: `Proper AED (Automated External Defibrillator) pad placement is essential for effective defibrillation, yet considerable variation in pad position and orientation may occur during actual use. This research aims to develop a tool that automatically identifies and quantifies the geometric position and orientation of AED pads relative to anatomical landmarks. By analyzing discrepancies between actual pad placement and recommended positions, this study seeks to establish an objective and reproducible framework for evaluating AED pad placement.`,
      zh: `正確擺放 AED（自動體外心臟去顫器）電擊貼片是有效電擊除顫的關鍵，然而實際使用時貼片的位置與方向常存在顯著差異。本研究旨在開發一套可自動辨識並量化電擊貼片相對於解剖標誌之幾何位置與方向的工具，透過分析實際貼片放置位置與建議位置之差異，建立一套客觀且可重複之電擊貼片放置評估框架。`,
    },
    {
      type: 'heading',
      en: 'CT Image Lesion Detection Algorithm for Colorectal Cancer',
      zh: '結腸直腸癌 CT 影像病灶偵測演算法',
    },
    { type: 'image', src: 'colorectal_cancer.png' },
    {
      type: 'text',
      en: `Colorectal cancer tumors, characterized by high morphological heterogeneity and low contrast with surrounding tissue, present a bottleneck for automated segmentation accuracy in conventional single-modality computed tomography (CT) imaging. Although incorporating privileged information such as clinical notes has been shown to effectively improve model performance, this remains constrained in early screening settings prior to diagnosis, where such privileged information is unavailable. To address this practical challenge, we propose an image segmentation algorithm based on multimodal cross attention. This algorithm uses a 3D convolutional neural network as its image feature extraction backbone, combined with a medical domain language encoder, deeply fusing clinical semantic information into the feature extraction process through a multi-scale cross attention mechanism; in addition, the system incorporates a learning using privileged information (LUPI) training strategy together with random feature masking, enabling the model to operate at inference time using only general-purpose prompts, thereby eliminating reliance on patient-specific clinical data during inference.`,
      zh: `結腸直腸癌腫瘤因形態異質性高且與周圍組織對比度低，導致傳統單一斷層掃描（CT）影像的自動化分割準確度面臨瓶頸。儘管引入病歷描述等特權資訊已被證實能有效提升模型性能，但在尚未確診的早期篩檢階段仍受限於特權資訊缺失。為了解決這項實務痛點，我們提出基於多模態交叉注意力之影像分割演算法。該演算法以 3D 卷積神經網路為影像特徵提取骨幹，並結合醫學領域語言編碼器，透過多尺度交叉注意力機制（Cross Attention），在影像特徵提取的過程中深度融合臨床語義資訊；此外，系統導入特權資訊學習（LUPI）訓練策略與特徵隨機遮蔽技術，使模型在推論階段僅需通用提示詞（Prompt）即可運作，擺脫推論時對特定病患臨床資料的依賴。`,
    },
  ],
  'Smart Agriculture': [
    {
      type: 'heading',
      en: 'Integrated Rotary Cultivation Automated Planting System',
      zh: '一貫化旋轉式栽培自動化栽植系統',
    },
    { type: 'video', youtube: 'CoFFuq6J7UE' },
    {
      type: 'text',
      en: `To address the greenhouse effect and advance green carbon cycling, integrating protected agriculture with three-dimensional spatial reconfiguration and automated production transformation has demonstrated substantial potential for sustainable development. Our team developed an automated vertical cultivation production system that integrates IoT-based smart environmental control with agricultural collaborative robots. This system employs an innovative Ferris-wheel-style natural-light vertical cultivation mechanism, precisely overcoming the limitations of uneven light exposure and insufficient space utilization inherent in conventional vertical greenhouse crops, while coupling machine vision recognition with three-dimensional spatial positioning technology to stably perform an integrated suite of agricultural tasks, including crop maturity monitoring, automated transplanting, and precision harvesting.`,
      zh: `為因應溫室效應並落實綠能碳循環，將設施農業結合立體空間再造與生產自動化轉型，已展現龐大的永續發展潛力。本團隊開發一套整合物聯網智慧環境控制與農業作業協作機器人之自動化垂直栽培生產系統。該系統採用創新之摩天輪式自然光垂直栽培機構，能精準克服傳統垂直溫室作物受光不均與空間利用率不足之限制，並偕同機器視覺辨識與三維空間定位技術，穩定執行作物生長成熟度監測、自動化定植與精準採收等一貫化農務作業。`,
    },
    {
      type: 'heading',
      en: 'Geometry-Free Visual Topology Reconstruction of Non-Spherical Compound Eyes',
      zh: '昆蟲非球形複眼之無幾何先驗視覺拓樸重建',
    },
    { type: 'image', src: 'compound_eye.png' },
    {
      type: 'text',
      en: `Existing methods for measuring the compound eyes of insects largely rely on a priori geometric models that assume a perfect spherical shell with all ommatidial optical axes converging orthogonally at a single center. However, honeybee compound eyes are both non-spherical and populated with substantial numbers of skewed ommatidia, causing conventional algorithms to produce severe systematic bias in their computed interommatidial angles. We propose a micro-CT-based method for reconstructing the three-dimensional visual topology of the honeybee compound eye. This method computes interommatidial angles directly from the true spatial coordinates and optical axis orientation of each ommatidium to establish neighboring relationships, while also quantifying each ommatidium's degree of tilt relative to the eye surface. By moving beyond the constraints of a priori geometric models, this approach introduces greater freedom into the optical characterization of insect compound eyes, offering a means to explore how insects allocate visual resources according to survival tasks, and holds potential as a future design reference for non-uniform sampling in biomimetic compound eye engineering.`,
      zh: `既有測量昆蟲複眼的演算法多仰賴「複眼為完美球殼、所有小眼光軸垂直收斂於球心」的先驗幾何模型，然而蜜蜂複眼在非球形的同時存在大量傾斜小眼，使傳統演算法推算之眼間角（interommatidial angle）產生嚴重系統性偏差。我們提出一套基於 micro-CT 重構之蜜蜂複眼三維視覺拓撲分析方法。該方法直接依據每一條小眼真實的空間座標與光軸指向建立相鄰關係並計算眼間角，同時衡量每一條小眼相對複眼表面的傾斜程度。此一方法擺脫了先驗幾何模型的侷限，為昆蟲複眼的光學表徵引入更高的自由度，有助於探索昆蟲依生存任務分配視覺資源的機制，並可望於未來作為複眼仿生工程非均勻取樣的設計依據。`,
    },
    {
      type: 'heading',
      en: 'Deep Learning-Based Monitoring of Hive Traffic and Pollen-Foraging Behavior',
      zh: '基於深度學習之蜂群流量與花粉覓食行為監測',
    },
    { type: 'image', src: 'honeybee.png' },
    {
      type: 'text',
      en: `In response to the challenges of precision pollination and colony health management facing protected agriculture and the beekeeping industry amid climate change, we developed a novel beehive observation box paired with a multi-functional behavior-counting algorithm. This algorithm combines a lightweight object detection model (YOLO) with a semantic segmentation architecture (PP-LiteSeg) to track bees entering and exiting the hive in real time and precisely segment the pixel area of pollen carried on their hind legs; in parallel, the system incorporates a multi-object tracking algorithm (ByteTrack) to build a highly correlated quantitative model linking pollen image area to actual pollen weight, achieving fully automated, zero-manual-intervention statistics on colony activity and pollen foraging volume.`,
      zh: `針對氣候變遷下設施農業與蜂產業面臨的精準授粉與蜂群健康管理挑戰，我們研發出一套新型蜜蜂觀察盒與多功能行為計數演算法。該演算法結合輕量化物件偵測模型（YOLO）與語意分割架構（PP-LiteSeg），能即時追蹤蜜蜂進出巢位置並精細分割後腳所攜帶之花粉像素面積；同時，系統協同多目標追蹤演算法（ByteTrack）建立「花粉影像面積與實體花粉重量」的高相關性量化模型，達成零人工介入的蜂群活動力與花粉採集量自動化統計。`,
    },
    {
      type: 'heading',
      en: 'Application of AIoT Technology to Pest Control in Protected Crop Cultivation',
      zh: 'AIoT 技術應用於設施作物之蟲害控制',
    },
    { type: 'image', src: 'pest_control.png' },
    {
      type: 'text',
      en: `In high-density greenhouse cultivation environments, small pests such as whiteflies and thrips are notoriously difficult to control in a timely and precise manner via traditional manual inspection, owing to their cryptic behavior and the spatiotemporal variability of environmental factors. We combine edge computing with time-series analysis to develop a suite of early-warning and tracking algorithms specifically designed for pest detection in protected crops. On the hardware side, this algorithm interfaces with IoT environmental sensors and a solar-powered image acquisition system deployed throughout the greenhouse, autonomously performing multi-scale sub-image segmentation optimization; at its algorithmic core, the system employs a lightweight object detection model for high-accuracy automated identification of pests on sticky traps, further integrating environmental big data through time-series analysis to enable prediction of pest population trends over specific future periods.`,
      zh: `在溫室高密度栽培環境中，小型害蟲如粉蝨與薊馬常因其隱蔽特性與環境因子的時空變異，導致傳統人工巡檢極度耗時且難以即時精準防治。我們結合邊緣運算與時序分析技術，研發一系列專為設施作物設計的蟲害早期預警與追蹤演算法。該演算法在硬體端串接布署於溫室內的環境物聯網感測器與太陽能供電影像擷取系統，能自主進行多尺度子影像分割優化；在演算法核心上，系統導入輕量化物件偵測模型進行高精確度的黏蟲紙害蟲自動化辨識，並進一步融合環境大數據進行時間序列分析，允許預測未來特定週期內的蟲害數量趨勢。`,
    },
  ],
  'Medical Data': [
    {
      type: 'heading',
      en: 'Multimodal Deep Learning for Computational Aptamer Screening and Affinity Prediction',
      zh: '運用多模態深度學習於適體計算篩選與親和力預測',
    },
    { type: 'image', src: 'aptamer.png' },
    {
      type: 'text',
      en: `Aptamers, single-stranded DNA or RNA molecules with high specificity and affinity, hold significant potential for applications in disease detection, drug development, and precision medicine. However, the conventional aptamer selection method, SELEX, involves a cumbersome and time-consuming workflow that relies heavily on extensive experimental trial and error. To improve aptamer screening efficiency, this study proposes a multimodal deep learning framework that integrates sequence features extracted from large biological language models (ESM-2 for proteins; Evo-2 for aptamers) with three-dimensional structural features provided by AlphaFold 3. In parallel, self-attention and cross-attention modules are employed to predict the binding affinity between aptamers and target proteins, effectively distinguishing candidate sequences with strong binding potential and improving the ranking of high-potential aptamer candidates.`,
      zh: `適體（Aptamer）是具有高度特異性與親和力的單鏈 DNA 或 RNA，具有應用於疾病檢測、藥物開發與精準醫療的潛力。然而，傳統適體篩選方法 SELEX 流程繁瑣耗時，且仰賴大量實驗試錯。為提升適體篩選效率，本研究提出一套多模態深度學習框架，整合大型生物語言模型（蛋白質端：ESM‑2；適體端：Evo‑2）所萃取之序列特徵以及 AlphaFold 3 提供之三維結構特徵。同時，透過自注意力與交叉注意力模組預測適體與目標蛋白之間的結合親和力，藉此有效區分具結合潛力的候選序列，提升高潛力適體的排序能力。`,
    },
    {
      type: 'heading',
      en: 'Multidimensional Clinical Big Data Fusion and Early Prediction Solution for Sepsis',
      zh: '多維臨床大數據融合與敗血症早期預測解決方案',
    },
    { type: 'image', src: 'sepsis.png' },
    {
      type: 'text',
      en: `Sepsis is a critical condition with an extremely high mortality rate in intensive care units, where early prediction can substantially improve patient survival rates. Existing sepsis prediction systems largely rely on statistical regularity-based imputation of missing values, but clinical data commonly exhibit a high proportion of missing not at random (MNAR) patterns, making it difficult for conventional imputation methods to preserve the clinical semantics implicit in these features. We propose a dual-branch hybrid architecture combining a long short-term memory network (LSTM) with a large language model (Llama 3 8B). The LSTM numerical branch models the dynamic trends of time-series data, while the LLM semantic branch captures clinical semantics through template-based text conversion and is fine-tuned using LoRA/DoRA. The two branches are combined through a gated fusion mechanism that adaptively weights their contributions, producing a fused representation that captures both temporal dynamics and clinical semantics. Building on this missing value imputation approach, the model then performs early sepsis prediction through a downstream classifier. Experiments show that this model's performance advantage over other prediction methods grows as data sparsity and prediction horizon increase, maintaining an early warning capability of AUROC = 0.801 as far as 11 hours before onset, providing a preliminary validation foundation for future research combining large language models with clinical time-series data.`,
      zh: `敗血症為加護病房中死亡率極高之急重症，早期預測能夠大幅提升病患存活率。現有敗血症預測系統大多依賴數值的統計規律插補資料，但臨床數據普遍存在大量非隨機缺失（MNAR）的情形，傳統資料插補方法難以維持特徵隱含的臨床語意。我們提出長短期記憶網路（LSTM）與大型語言模型（Llama 3 8B）之雙分支混合式架構。LSTM數值分支建立時序資料的動態趨勢，LLM語意分支透過模板式文字轉換捕捉臨床語義，並以 LoRA/DoRA 進行微調。兩分支透過門控融合（Gated Fusion）機制調整權重，產出兼具時序動態與臨床語意的融合表示。基於前述缺失值插補，模型再由下游分類器執行敗血症早期預測。實驗顯示，該模型的表現在資料越稀疏、預測時距越長的情形下越高於其他預測方法，於發病前11小時仍可維持AUROC=0.801的早期預警能力，為結合大型語言模型與臨床時序資料之未來研究提供初步驗證基礎。`,
    },
    {
      type: 'heading',
      en: 'Clinical Multimodal Data Fusion and Early Warning System for Acute Kidney Injury',
      zh: '臨床多模態數據融合與急性腎損傷早期預警系統',
    },
    { type: 'image', src: 'aki.png' },
    {
      type: 'text',
      en: `In clinical settings, acute kidney injury (AKI), which can deteriorate rapidly in critically ill patients, often causes the golden treatment window to be missed due to the inherent lag of conventional indicators. We combined structured physiological data with unstructured clinical narrative text to develop a cross-modal fusion intelligent early-warning algorithm. The core breakthrough of this algorithm lies in incorporating natural language processing techniques to develop a domain-specific pretrained language model for AKI (AKIBERT), capable of deeply parsing and transforming narrative records within clinical notes; in parallel, the system incorporates XGBoost together with an incremental learning architecture, achieving highly generalizable prospective prediction 24 to 72 hours before onset using only a small set of core features.`,
      zh: `臨床上，重症病患迅速惡化的急性腎損傷（AKI）常因傳統指標的滯後而錯失黃金治療期。我們結合了結構化生理數據與非結構化病歷文本，研發出一套跨模態融合的智慧早期預警演算法。該演算法的核心突破在於導入自然語言處理技術，開發出 AKI 領域專用的預訓練語言模型（AKIBERT），能深度解構並轉換病歷中的敘事紀錄；同時，系統協同 XGBoost 與增量式學習架構，僅需少量的核心特徵即可在發病前 24 至 72 小時實現泛化性極佳的前瞻預測。`,
    },
  ],
  Biosensing: [
    {
      type: 'heading',
      en: 'Floating Aquatic Plants and Agro-Livestock Waste Biogas Power Generation System',
      zh: '漂浮性植物與農畜廢棄物沼氣發電系統',
    },
    { type: 'image', src: 'biogas.png' },
    {
      type: 'text',
      en: `To address the greenhouse effect and advance green carbon cycling, integrating agricultural and livestock wastewater treatment with high-carbon-fixation plant cultivation and biogas energy transition has demonstrated substantial potential for sustainable development. To this end, our team developed an automated floating plant growth and water quality monitoring system that integrates IoT with UAV aerial imaging. This system employs a two-stage deep learning architecture to achieve precise, rapid segmentation of the effective water surface area and pixel-level recognition of floating plant growth coverage, while coupling a time-series model to stably predict biogas production output for the following week.`,
      zh: `為因應溫室效應並落實綠能碳循環，將農畜牧廢水處理連結高固碳植物養殖與沼氣能源轉型，已展現龐大的永續發展潛力。為此，本團隊開發了一套整合物聯網與無人機空拍之自動化浮生植物生長與水質監測系統。該系統採用二階段深度學習架構，能精準進行水面有效範圍之快速分割與浮生植物生長覆蓋率之像素級辨識，並偕同時間序列時序模型穩定預測未來一週之沼氣產能。`,
    },
    {
      type: 'heading',
      en: 'Rapid Saliva-Based Drug Screening Device',
      zh: '毒品唾液快篩檢測',
    },
    { type: 'image', src: 'drug_screen.png' },
    {
      type: 'text',
      en: `As a flagship project selected among Academia Sinica's National Top Ten Achievements under the "Taiwan Advanced Instrumentation Development Program" for four consecutive years (2017–2020), this research focuses on the deep integration of cutting-edge biomedical sensor hardware development with cross-disciplinary big data intelligent analysis. To overcome the key bottleneck of conventional drug testing, namely its heavy reliance on laboratory procedures, time-consuming workflow, and lack of real-time capability, our team collaborated closely with judicial authorities, medical institutions, and drug policy research organizations to develop a portable rapid saliva-based drug screening device. The core hardware of this device integrates a high-end optical chamber design, a central processing unit, and highly sensitive biosensing components, substantially enhancing signal strength from trace sample collection; on the software side, the system incorporates state-of-the-art image interpretation and big data analytics to perform highly accurate qualitative and quantitative assessments automatically, in real time and on-site outside the laboratory, significantly reducing both false-negative and false-positive rates.`,
      zh: `作為連續多年（2017-2020）獲選中央研究院「臺灣高階儀器發展計畫」國家十大成果的旗艦項目，本研究聚焦於頂尖生醫感測器硬體研製與跨界大數據智慧分析的深度整合。為了突破傳統毒品檢驗高度依賴實驗室操作、耗時且缺乏即時性的關鍵瓶頸，我們團隊與司法機關、醫療及毒品政策研究單位密切合作，打造出一套可攜式毒品唾液快速篩檢儀器。該儀器核心硬體整合高端光室設計、中央處理器及高靈敏生物感測元件，能大幅提升微量樣本採集的訊號強度；在軟體演算法上，系統導入前沿的影像判讀與大數據分析技術，可在即時、即地的非實驗室環境下自動進行高度準確的定性與定量評估，顯著降低偽陰與偽陽率。`,
    },
    {
      type: 'text',
      en: `This technology has since been successfully commercialized, with a joint R&D center (SmarTest R&D Center) established together with industry-academia partners. To align the technology with international practice, the team traveled to the United States to participate in "RISE23," the flagship global conference on judicial treatment approaches hosted by All Rise (formerly the National Association of Drug Court Professionals, NADCP). At the conference, we conducted focus group discussions and in-depth user interviews with key stakeholders from across the country, including judges, prosecutors, case managers, coordinators, treatment agencies, and testing laboratories, drawing on frontline, multi-perspective practical experience and technical feedback to iteratively refine the screening system and its algorithms, laying the most scientifically grounded foundation for intelligent decision-making in portable drug prevention and forensic precision testing.`,
      zh: `目前本技術已成功商業化，並與產學合作企業共同成立聯合研發中心（SmarTest R&D Center）。為了將研發技術與國際實務接軌，團隊赴美國參與由 All Rise（原美國毒品法庭專業人士協會 NADCP）所舉辦之全球司法處遇領航盛會「RISE23」。在盛會中，我們與匯聚全美的法官、檢察官、個案管理師、協調員、處遇機構以及檢驗單位等關鍵領域從業人員進行焦點小組討論與深入的使用者訪談，致力於結合第一線多元視角的實際工作經驗與技術問題回饋，對快篩系統與演算法進行迭代優化，為可攜式智慧毒品防制與法醫精準檢測奠定最具科學基礎之智慧化決策依據。`,
      links: [{ text: 'SmarTest R&D Center', href: 'https://smartestrdcenter.com/' }],
    },
  ],
};

// Footer contact (Spec §11).
export const SITE = {
  labName: { en: 'CIBI Lab', zh: '智慧演算生醫影像實驗室' } as BiPair,
  address: {
    en: 'Lab 103 & 105, Agriculture Machinery Building,\nDepartment of Biomechatronics Engineering, National Taiwan University,\nNo. 1, Sec. 4, Roosevelt Rd., Taipei 10617, Taiwan (R.O.C.)',
    zh: '10617 臺北市大安區羅斯福路四段一號\n國立臺灣大學生物機電工程學系　農機館 103、105 室',
  } as BiPair,
  tel: '+886-2-3366-9820',
};
