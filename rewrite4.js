const fs = require('fs');
let html = fs.readFileSync('cv.html', 'utf8');

// 1. Swap image
html = html.replace('img/simran-casual.jpeg', 'img/simran.jpeg');

// 2. Remove all <em>, </em>, <b>, </b>, <strong>, </strong> globally
html = html.replace(/<\/?(em|b|strong)[^>]*>/gi, '');

// 3. Remove 775% stat entirely
html = html.replace('<div>775%Engagement growth</div>', ''); // Note: spaces might differ due to tag removal
html = html.replace('<div><b>775%</b>Engagement growth</div>', '');
html = html.replace(/<div>775%.*?<\/div>/i, '');
// Better: regex for that exact block
html = html.replace(/<div[^>]*>\s*(?:<b>)?775%(?:<\/b>)?\s*Engagement growth\s*<\/div>/gi, '');

// 4. Trimming verbosity

// Hero Sub
html = html.replace(
  'Product Marketing Manager specialising in positioning, messaging architecture, and GTM strategy for 50+ brands, translating product value into clear, scalable market stories.',
  'Product Marketing Manager specialising in positioning, messaging, and GTM strategy for 50+ brands.'
);

// Philosophy
html = html.replace(
  'Narrative is infrastructure. Positioning, messaging, sales enablement, brand voice — they collapse into one asset when the story underneath is sharp.',
  'Narrative is infrastructure. When the story is sharp, everything else aligns.'
);
html = html.replace(
  'Category before copy. The best writing in the world can\'t save a muddled position. Most of my best work has been naming the thing the category pretends not to see, then building everything downstream from that single sentence.',
  'Category before copy. The best writing can\'t save a muddled position. Name the elephant in the room, build downstream.'
);
html = html.replace(
  'Speed is a muscle. Agency timelines trained a different clock: 3+ projects a week, budgets from ₹5 L to ₹1 Cr, same bar on every one. That compression is the unfair advantage I bring into longer SaaS cycles.',
  'Speed is a muscle. Agency timelines trained me to deliver high-quality work under severe compression.'
);

// Experience: Break
html = html.replace(
  'Deliberate break after leading multi-year, high-intensity agency and brand mandates. Used the time to consolidate learnings from creative leadership, brand strategy and GTM execution, and refine positioning toward senior brand and marketing roles with deeper ownership and impact.',
  'Consolidating learnings from agency and brand mandates to target senior roles with deeper ownership.'
);
html = html.replace(
  '<p>Personal growth: setting goals and systems for physical fitness and personal creative pursuits. Built this portfolio and the Author.AI chronicle end-to-end.</p>',
  ''
);

// Experience: Sociowash
html = html.replace(
  'Led strategic ideation, positioning, and GTM thinking for high-velocity launch mandates across OTT film releases and consumer electronics categories.',
  'Led positioning and GTM for high-velocity launches across OTT and consumer electronics.'
);
html = html.replace(
  '<p>Developed launch narratives, messaging frameworks, and campaign ideas for 3+ projects per week under compressed timelines. Worked directly with the agency founder on high-priority, high-ticket mandates — owning strategic direction from brief to final concept approval.</p>',
  '<p>Owned strategic direction on high-priority mandates, handling 3+ projects a week directly with founders.</p>'
);
html = html.replace(
  '<p>Defined positioning and creative direction for launches with execution budgets from ₹5 Lakh to ₹1 Crore, ensuring clarity and consistency across parallel projects.</p>',
  ''
);

// Experience: Foxymoron
html = html.replace(
  'Led copy and creative strategy across four tier-one brands. Conceptualised a social-experiment DVC that achieved 4.6M+ YouTube views.',
  'Led creative strategy across four tier-one brands, including a DVC with 4.6M+ views.'
);
html = html.replace(
  'SanDisk repositioning. Moved the brand from commodity storage to The Pursuit of Photography. Positioning strategy, messaging architecture, brand voice guidelines, campaign narrative.',
  'SanDisk repositioning. Moved brand from commodity storage to The Pursuit of Photography.'
);
html = html.replace(
  'M&S — BraFit. ₹18 Lakh film. Concepted "uncomfortable chairs" — a visual metaphor for wrong-fit bras. Script, narrative, concept.',
  'M&S — BraFit. Scripted visual metaphor campaign for wrong-fit bras.'
);
html = html.replace(
  'Kia Syros launch. Messaging across social, emailers, digital ads — launch campaign for the new SUV into the Indian market.',
  ''
);
html = html.replace(
  '<p>Shaped narratives across digital, film, social. Supervised a 3-member writing team; aligned with art, design and strategy pods for cohesive brand voice. Drove creative pitches for Oberoi Hotels, Tata Neu, SanDisk, contributing to multiple new business wins.</p>',
  '<p>Supervised a 3-member writing team and drove successful pitches for Oberoi Hotels, Tata Neu, and SanDisk.</p>'
);

// Experience: iCubesWire
html = html.replace(
  'Handled creative for 20+ brands. Launched Ambience Creacions, Caitriona, Omaxe Chandni Chowk and World Street campaigns; revamped Ambience\'s website.',
  'Handled creative for 20+ brands. Launched major real estate campaigns and revamped websites.'
);

// Experience: Maa Homes
html = html.replace(
  'Drove launches for ₹100 Cr+ projects end-to-end, from story to performance marketing. Executed a ₹27 L channel-partner event for 350+ brokers — delivered 40% business conversion.',
  'Drove ₹100 Cr+ project launches end-to-end. Executed major channel-partner event with 40% conversion.'
);
html = html.replace(
  '<p>Built CRM and analytics dashboards; lifted lead-to-visit rate by 22%.</p>',
  ''
);
html = html.replace(
  '<p>Proof of work: collaterals · brand induction videos · timeline · research · offline advertising · channel-partner meet · investor plans · CRM kit · audit.</p>',
  ''
);

// Experience: Elegance
html = html.replace(
  'Created campaigns for Godrej, Prestige, Subha Builders, and Total Environment (PORR). Supported demand generation across real-estate mandates.',
  'Created campaigns for major real estate developers to support demand generation.'
);
html = html.replace(
  '<p>Helped launch \'Simplifying Farmlands\' and the firm\'s first flagship project \'Vrindavan\' — crafting brand story, launch collaterals, and digital campaigns that established its presence in a competitive real-estate market.</p>',
  ''
);

// Experience: 21 Degree
html = html.replace(
  'Built the marketing engine for an e-commerce startup with 30+ leather accessory SKUs.',
  'Built marketing engine for e-commerce startup (30+ SKUs).'
);
html = html.replace(
  '<p>Managed Maharashtra Natural Gas Ltd. social media; grew engagement 260%, cut response time from 48 hrs → 4 hrs, improved satisfaction to 90%.</p>',
  ''
);
html = html.replace(
  '<p>Hands-on in media buying, ORM, product listing, and brand voice — first taste of "startup speed."</p>',
  '<p>Hands-on media buying, ORM, and brand voice.</p>'
);

// Experience: Hyatt
html = html.replace(
  'Began career in hospitality — learnt service psychology and the art of empathy that still guides brand thinking.',
  'Learnt service psychology and empathy.'
);


// Strengths
html = html.replace('ICP, competitive positioning, GTM sequencing, long-horizon direction.', 'ICP, positioning, GTM.');
html = html.replace('Compressing complexity into memorable positioning. Selling without feeling salesy.', 'Compressing complexity into narrative.');
html = html.replace('50+ brands across auto, tech, fashion, real estate. What transfers, what doesn\'t.', 'Transferring insights across categories.');
html = html.replace('Frameworks, multi-agent AI workflows. Turning taste into a machine.', 'Multi-agent AI workflows and frameworks.');

// Education
html = html.replace(
  'GTM, lifecycle marketing, buyer psychology, brand salience (media & budget planning), AI workflow automation.',
  'GTM, buyer psychology, AI workflow automation.'
);
html = html.replace(
  'Capstone: Drop-shipping with Bayaan, repositioned the business as logistics arbitrage rather than e-commerce. Won the capstone project.',
  'Won capstone project by repositioning business as logistics arbitrage.'
);
html = html.replace(
  'Three years of hospitality training, service standards, guest psychology, operational instinct. Part of the Kitchen Club and the Editorial Board. Transferred cleanly into brand and messaging work later.',
  'Hospitality training, guest psychology, operational instinct.'
);

fs.writeFileSync('cv.html', html);
