import { Alert, AsyncStorage } from 'react-native';

class DataModel {
    _instance = null;
    static instance() { return (this._instance == null ? this._instance = new DataModel() : this._instance) };

    static dataArtists = {
        'Yoyo Flow': { insta: "", portrait: "yoyo_flow.png", bio: "was born, grew up and graduated choreographic education in Cuba. Gorgeous, charismatic dancer with a unique Cuban style and energy. Studied in various courses of the famous school of Tony Mendez (Havana, Cuba). Yoandi has experience performing in theaters: \"Nacional de cuba\", \"Melle\", \"Astral\", \"Carlos mar\", also danced in the show-ballets: \"Tony Mendez\", \"Havana dance star\", \"YolDance\"." },
        'Yenifer Lavin': { insta: "", portrait: "yenifer_lavin.png", bio: "She comes from Cuba, where she went to the National School of Art in Havana. There, she studied modern styles of dance as well as traditional Cuban dance. Now, she lives in Barcelona, where she is involved in the global dance community. She doesn’t just dance; she also creates dance routines and teaches others. \n She has been a part of many important dance events and shows in Spain, working with well-known people like singer Dua Lipa and popular brands like Nike. Presently, she dances alongside Yoandy Villaurrutia, who is also a talented dancer and creator of dance routines. Together, they create beautiful and impressive dance performances." },
        'Eloy J Rojas': { insta: "", portrait: "eloy_j_rojas.png", bio: "Is a renowned dancer and choreographer specializing in Latin and Afro-Cuban rhythms. Trained in Venezuela and Mexico, he founded EJR Studio in Berlin and gained fame for his innovative techniques. Eloy is a multiple award-winner, including top prizes in Amsterdam and Berlin. His groundbreaking 2022 project, \"From the Roots,\" earned federal funding and set a new standard for Latin dance in Europe. Today, he continues to captivate audiences and students globally." },
        'Roger Palombella': { insta: "roger_palombella_dancer", portrait: "roger_palombella.png", bio: "Is an Italian salsa dancer, animator, and instructor from southern Italy, Barletta. He studied with the best Italian and Cuban trainers, he also developed his skills in Cuban Timba where he mixes salsa steps with Afro technique, interesting musicality and bodymovment, playing with dynamics and good flow!" },
        'Edyta Kwasna': { insta: "", portrait: "edyta_kwasna.png", bio: "Has the highest international S class in ballroom dancing. She has participated in numerous national and international tournaments. She represented Poland, Spain and the USA. Her desire to travel and explore the world is so big that she decided to combine it with dance. She had the opportunity to share her dance skills in Singapore, New York and Barcelona, where she lived in each of these places. She perfected her skills in Cuba, which will forever remain in her heart, thats why the last years she focused so much on Cuban culture." },
        'Yuliet Estrada': { insta: "", portrait: "yuliet_estrada.png", bio: "Yuliet, born in Havana, has been devoted to dance from a young age. She blossomed as a dancer at the Conjunto Folclorico de la Universidad de la Habana, learning various dance forms and techniques. Her talent shone bright when she won first place at the 1st International Festival of Popular and Ballroom Dances in Havana in 2007. \n Yuliet has performed in numerous shows and competitions, absorbing knowledge and style from various accomplished dancers and institutions. A significant part of her journey was spent at Laura Alonso's Prodanza Academy of Dance, where she embraced diverse dance fusion styles. \n In 2008, Yuliet moved to Oslo, Norway, where she evolved as a dancer and choreographer, contributing to significant projects and dance schools like SalsaKompaniet. Here, she collaborates with Andy Varona, and together they launched the Bailan2 Project, gaining substantial recognition. \n Specializing in dances like salsa, reggaeton, son, rumba, and Afro-Cuban, her journey, marked by significant achievements and collaborations, speaks volumes of her dedication and mastery in dance." },
        'Andy Varona': { insta: "", portrait: "andy_varona.png", bio: "Born in Havana, Cuba, he was drawn to music and dance from a tender age, finding his rhythm in urban genres like reggaeton. His professional journey blossomed in 2007 with Cuba’s prestigious Narciso Medina modern dance company. A significant chapter of his journey was enriched by experiences with eminent folkloric groups such as Raíces Profundas and the Conjunto Folclórico Nacional de Cuba. \n In 2014, accolades graced him as he was titled the 'First Dancer' by the National Council of Performing Arts of Cuba and became part of the distinguished rumba group, Osain del Monte. His artistry also illuminated the stages of the Buena Vista Social Club show. \n Europe welcomed his talent in 2014, where his presence resonated in the international festival scenes, marking him as a prominent young male figure in dance. Now residing in Norway, he collaborates with his partner, Yuliet Estrada, on the project Bailan2, and contributes his expertise to Salsakompaniet, one of Norway’s leading dance schools." },
        'Laura Del Vecchio': { insta: "", portrait: "laura_del_vecchio.png", bio: "Is more than just a dancer; she's a dance virtuoso with a career spanning from hip-hop to Salsa Cubana. Starting at age 6, Laura has dazzled audiences alongside stars like the Spice Girls and Thomas Gottschalk. She's won German dance championships. \n Laura brings a fusion of Salsa, Hip-Hop, Afro, Reggaeton, and Bachata to stages worldwide. \n She was on the big screen in \"Willkommen bei den Hartmanns\" and also as a choreographer for Let's Dance and fashion shows." },
        'Timo Lingnau': { insta: "timo_lingnau", portrait: "timo_lingnau.png", bio: "Timo is a dancer, choreographer, dance teacher, and DJ. His dance career began in his hometown of Augsburg under the tutelage of Emilito Herrera. While teaching at Herrera's dance school, Timo was also a part of the successful show team of Cuban Salsa Power. With this team, he won the German Championship for Rueda de Casino in 2013. \n He has also showcased his talent in group and duo performances at salsa congresses and concerts both domestically and internationally. In 2018, he clinched the first place with Julia von Oy at the \"Timba Competition\" during the prestigious Festival Internacional de Guaguancó Afro-Cubano in Lloret de Mar, Spain. 'La Maña' was the first show Timo choreographed for a group, premiering in Hamburg in 2022, followed by further performances in Berlin.\n Since 2014, Timo has been living in Berlin. There, he founded the dance school Cuban Salsa Power Berlin, which has since grown into the largest school for Cuban dances in the capital.\n Known as DJ TiMueve, Timo is a sought-after figure not just in Berlin. He is appreciated for his skillful blend of modern and classic tracks and Son Cubano." },
        'Lucas Flemming': { insta: "", portrait: "lucas_flemming.png", bio: "Lucas' journey as a dancer and dance instructor began as a classical music student at the prestigious HfM \"Hanns Eisler\" in Berlin. During his studies, he discovered his passion for dancing and enjoyed his training as a dancer and dance teacher at the Cuban Salsa Power Berlin dance school, where he soon began teaching. \n Lucas' expertise extends from dance methodology and deepening musicality in dance to the continuous development of innovative concepts in teaching dance styles such as Salsa Cubana, Son Cubano, and Rumba Cubana. His passion for teaching led him to work with renowned artists and teachers like Danger Rodriguez, Yunaisy Farray, Leivan García, and Fredy García Batista, where he expanded his repertoire. Moreover, Lucas is a proud co-founder and co-host of the scientific podcast on Cuban music titled \"Tanzpause,\" where the cultural and musical depths of the fascinating Cuban music and dance culture are explored." },
        'Kimberly Wirt': { insta: "", portrait: "kimberly_wirt.png", bio: "Kimberly's journey into the world of dance commenced in her early years, evolving significantly within the realms of Modern and Contemporary Dance. As a member of a Berlin dance formation, she competed in tournaments across Germany, notably competing in the 2nd national league of JMC Germany North/East/West in both 2016 and 2017. The technical prowess honed during this period, encompassing the foundations of ballet and contemporary dance, now serve as an invaluable wellspring of knowledge in her capacity as a dance teacher. \n Since venturing into the captivating universe of Cuban salsa and related dance forms, Kimberly has been an active participant in numerous festivals and private sessions. Shaped by influential figures within the global Salsa Cubana scene, she now has become one of the most transformative and influential teachers in the Berlins Cuban Salsa scene. Kimberly brings to the stage six years of teaching expertise alongside her esteemed dance partner, Lucas Flemming, with whom she continues to consistently evolve. \n Through dance, she not only aims to enthuse her students about the profound world of Salsa Cubana and related dances but also strives to unite people in the joy of movement and music." }
    };

    // static dataSchedule = {
    //     'Main Hall': [
    //         {
    //             title: 'Saturday',
    //             data: [
    //                 { id: 10, flag: false, date: 'Sa, 10 Feb 2024', time: '10:00 - 12:00', place: 'Main Hall', artistOne: '', artistTwo: '', artistName: '', sessionSubtitle: 'No Session - Join  Bootcamp' },
    //                 { id: 11, flag: false, date: 'Sa, 10 Feb 2024', time: '', place: 'Main Hall', artistOne: '', artistTwo: '', artistName: '', sessionSubtitle: '' },
    //                 { id: 12, flag: false, date: 'Sa, 10 Feb 2024', time: '12:00 - 13:00', place: 'Main Hall', artistOne: 'Roger Palombella', artistTwo: 'Edyta Kwasna', artistName: 'Roger & Edyta', sessionSubtitle: 'Salsa Elegante' },
    //                 { id: 13, flag: false, date: 'Sa, 10 Feb 2024', time: '13:10 - 14:10', place: 'Main Hall', artistOne: 'Yoyo Flow', artistTwo: 'Yenifer Lavin', artistName: 'Yoyo Flow & Yenifer', sessionSubtitle: 'Timba in Couples' },
    //                 { id: 14, flag: false, date: 'Sa, 10 Feb 2024', time: '14:20 - 15:20', place: 'Main Hall', artistOne: 'Andy Varona', artistTwo: 'Yuliet Estrada', artistName: 'Andy & Yuliet', sessionSubtitle: 'Chango - Oya' },
    //                 { id: 15, flag: false, date: 'Sa, 10 Feb 2024', time: '15:30 - 16:00', place: 'Main Hall', artistOne: '', artistTwo: '', artistName: '', sessionSubtitle: 'Break' },
    //                 { id: 16, flag: false, date: 'Sa, 10 Feb 2024', time: '16:00 - 17:00', place: 'Main Hall', artistOne: 'Yoyo Flow', artistTwo: 'Yenifer Lavin', artistName: 'Yoyo Flow & Yenifer', sessionSubtitle: 'Salsa New Style' },
    //                 { id: 17, flag: false, date: 'Sa, 10 Feb 2024', time: '17:10 - 18:10', place: 'Main Hall', artistOne: 'Laura Del Vecchio', artistTwo: '', artistName: 'Laura Del Vecchio', sessionSubtitle: 'Salsa Fusion' },
    //             ]
    //         },
    //         {
    //             title: 'Sunday',
    //             data: [
    //                 { id: 20, flag: false, date: 'So, 11 Feb 2024', time: '11:00 - 12:00', place: 'Main Hall', artistOne: 'Roger Palombella', artistTwo: 'Edyta Kwasna', artistName: 'Roger & Edyta', sessionSubtitle: 'Son Moderno' },
    //                 { id: 21, flag: false, date: 'So, 11 Feb 2024', time: '12:10 - 13:10', place: 'Main Hall', artistOne: 'Yoyo Flow', artistTwo: '', artistName: 'Yoyo Flow', sessionSubtitle: 'Timba Solo' },
    //                 { id: 22, flag: false, date: 'So, 11 Feb 2024', time: '13:20 - 14:20', place: 'Main Hall', artistOne: 'Andy Varona', artistTwo: 'Yuliet Estrada', artistName: 'Andy & Yuliet', sessionSubtitle: 'Rumba Guaguanco' },
    //                 { id: 23, flag: false, date: 'So, 11 Feb 2024', time: '14:30 - 15:30', place: 'Main Hall', artistOne: '', artistTwo: '', artistName: '', sessionSubtitle: 'Break' },
    //                 { id: 24, flag: false, date: 'So, 11 Feb 2024', time: '15:30 - 16:30', place: 'Main Hall', artistOne: 'Yoyo Flow', artistTwo: '', artistName: 'Yoyo Flow', sessionSubtitle: 'Timba New Style' },
    //                 { id: 25, flag: false, date: 'So, 11 Feb 2024', time: '16:40 - 17:40', place: 'Main Hall', artistOne: 'Yoyo Flow', artistTwo: '', artistName: 'Yoyo Flow', sessionSubtitle: 'Reparto' },
    //                 { id: 26, flag: false, date: 'So, 11 Feb 2024', time: '', place: 'Main Hall', artistOne: '', artistTwo: '', artistName: '', sessionSubtitle: '' },
    //                 { id: 27, flag: false, date: 'So, 11 Feb 2024', time: '', place: 'Main Hall', artistOne: '', artistTwo: '', artistName: '', sessionSubtitle: '' }
    //             ],
    //         },
    //     ],
    //     'Room 2':
    //         [
    //             {
    //                 title: 'Saturday',
    //                 data: [
    //                     { id: 30, flag: false, date: 'Sa, 10 Feb 2024', time: '10:00 - 13:00', place: 'Room 2', artistOne: 'Laura Del Vecchio', artistTwo: '', artistName: 'Laura Del Vecchio', sessionSubtitle: 'Ladies movement & Styling' },
    //                     { id: 31, flag: false, date: 'Sa, 10 Feb 2024', time: '', place: 'Room 2', artistOne: '', artistTwo: '', artistName: '', sessionSubtitle: '' },
    //                     { id: 32, flag: false, date: 'Sa, 10 Feb 2024', time: '', place: 'Room 2', artistOne: '', artistTwo: '', artistName: '', sessionSubtitle: '' },
    //                     { id: 33, flag: false, date: 'Sa, 10 Feb 2024', time: '13:10 - 14:10', place: 'Room 2', artistOne: 'Eloy J Rojas', artistTwo: '', artistName: 'Eloy J Rojas', sessionSubtitle: 'Afro Mambo' },
    //                     { id: 34, flag: false, date: 'Sa, 10 Feb 2024', time: '14:20 - 15:20', place: 'Room 2', artistOne: 'Timo Lingnau', artistTwo: '', artistName: 'Timo Lingnau', sessionSubtitle: 'Footwork' },
    //                     { id: 35, flag: false, date: 'Sa, 10 Feb 2024', time: '15:30 - 16:00', place: 'Room 2', artistOne: '', artistTwo: '', artistName: '', sessionSubtitle: '' },
    //                     { id: 36, flag: false, date: 'Sa, 10 Feb 2024', time: '16:00 - 17:00', place: 'Room 2', artistOne: 'Roger Palombella', artistTwo: 'Edyta Kwasna', artistName: 'Roger & Edyta', sessionSubtitle: 'Salsa Musicality Solo & Partnerwork' },
    //                     { id: 37, flag: false, date: 'Sa, 10 Feb 2024', time: '17:10 - 18:10', place: 'Room 2', artistOne: '', artistTwo: '', artistName: '', sessionSubtitle: '' }
    //                 ]
    //             },
    //             {
    //                 title: 'Sunday',
    //                 data: [
    //                     { id: 40, flag: false, date: 'So, 11 Feb 2024', time: '11:00 - 12:00', place: 'Room 2', artistOne: 'Lucas Flemming', artistTwo: '', artistName: 'Lucas Flemming', sessionSubtitle: 'Musicality in Timba' },
    //                     { id: 41, flag: false, date: 'So, 11 Feb 2024', time: '12:10 - 13:10', place: 'Room 2', artistOne: 'Yenifer Lavin', artistTwo: '', artistName: 'Yenifer Lavin', sessionSubtitle: 'Lady Styling' },
    //                     { id: 42, flag: false, date: 'So, 11 Feb 2024', time: '13:20 - 14:20', place: 'Room 2', artistOne: 'Laura Del Vecchio', artistTwo: '', artistName: 'Laura Del Vecchio', sessionSubtitle: 'Reggaeton Fusion' },
    //                     { id: 43, flag: false, date: 'So, 11 Feb 2024', time: '14:30 - 15:30', place: 'Room 2', artistOne: '', artistTwo: '', artistName: '', sessionSubtitle: 'Break' },
    //                     { id: 44, flag: false, date: 'So, 11 Feb 2024', time: '15:30 - 16:30', place: 'Room 2', artistOne: 'Eloy J Rojas', artistTwo: '', artistName: 'Eloy J Rojas', sessionSubtitle: 'Mambo Fusion' },
    //                     { id: 45, flag: false, date: 'So, 11 Feb 2024', time: '16:40 - 17:40', place: 'Room 2', artistOne: 'Roger Palombella', artistTwo: 'Edyta Kwasna', artistName: 'Roger & Edyta', sessionSubtitle: 'Solo Styling' },
    //                     { id: 46, flag: false, date: 'So, 11 Feb 2024', time: '', place: 'Room 2', artistOne: '', artistTwo: '', artistName: '', sessionSubtitle: '' },
    //                     { id: 47, flag: false, date: 'So, 11 Feb 2024', time: '', place: 'Room 2', artistOne: '', artistTwo: '', artistName: '', sessionSubtitle: '' }
    //                 ],
    //             },
    //         ]
    // };

    static dataRaw = [
        { id: 10, flag: false, room: 'Main Hall', sectionTitle: 'Saturday', date: 'Sat, 10 Feb 2024', time: '10:00 - 13:00', place: 'Main Hall', artistOne: '', artistTwo: '', artistName: '', sessionSubtitle: '' },
        { id: 12, flag: false, room: 'Main Hall', sectionTitle: 'Saturday', date: 'Sat, 10 Feb 2024', time: '12:00 - 13:00', place: 'Main Hall', artistOne: 'Roger Palombella', artistTwo: 'Edyta Kwasna', artistName: 'Roger & Edyta', sessionSubtitle: 'Salsa Elegante' },
        { id: 13, flag: false, room: 'Main Hall', sectionTitle: 'Saturday', date: 'Sat, 10 Feb 2024', time: '13:10 - 14:10', place: 'Main Hall', artistOne: 'Yoyo Flow', artistTwo: 'Yenifer Lavin', artistName: 'Yoyo Flow & Yenifer', sessionSubtitle: 'Timba in Couples' },
        { id: 14, flag: false, room: 'Main Hall', sectionTitle: 'Saturday', date: 'Sat, 10 Feb 2024', time: '14:20 - 15:20', place: 'Main Hall', artistOne: 'Andy Varona', artistTwo: 'Yuliet Estrada', artistName: 'Andy & Yuliet', sessionSubtitle: 'Chango - Oya' },
        { id: 15, flag: false, room: 'Main Hall', sectionTitle: 'Saturday', date: 'Sat, 10 Feb 2024', time: '15:30 - 16:00', place: 'Main Hall', artistOne: '', artistTwo: '', artistName: '', sessionSubtitle: 'Break' },
        { id: 16, flag: false, room: 'Main Hall', sectionTitle: 'Saturday', date: 'Sat, 10 Feb 2024', time: '16:00 - 17:00', place: 'Main Hall', artistOne: 'Yoyo Flow', artistTwo: 'Yenifer Lavin', artistName: 'Yoyo Flow & Yenifer', sessionSubtitle: 'Salsa New Style' },
        { id: 17, flag: false, room: 'Main Hall', sectionTitle: 'Saturday', date: 'Sat, 10 Feb 2024', time: '17:10 - 18:10', place: 'Main Hall', artistOne: 'Laura Del Vecchio', artistTwo: '', artistName: 'Laura Del Vecchio', sessionSubtitle: 'Salsa Fusion' },
        { id: 18, flag: false, room: 'Main Hall', sectionTitle: 'Saturday', date: 'Sat, 10 Feb 2024', time: '20:00 - 21:00', place: 'Main Hall', artistOne: 'Lucas Flemming', artistTwo: 'Kimberly Wirt', artistName: 'Lucas & Kimmy', sessionSubtitle: 'Rueda' },
       
        { id: 30, flag: false, room: 'Room 2', sectionTitle: 'Saturday', date: 'Sat, 10 Feb 2024', time: '10:00 - 13:00', place: 'Room 2', artistOne: 'Laura Del Vecchio', artistTwo: '', artistName: 'Laura Del Vecchio', sessionSubtitle: 'Bootcamp', sessionDescription: "Ladies Movement & Styling" },
        { id: 32, flag: false, room: 'Room 2', sectionTitle: 'Saturday', date: 'Sat, 10 Feb 2024', time: '12:00 - 13:00', place: 'Room 2', artistOne: '', artistTwo: '', artistName: '', sessionSubtitle: '(Bootcamp cont.)', sessionDescription: "" },
        { id: 33, flag: false, room: 'Room 2', sectionTitle: 'Saturday', date: 'Sat, 10 Feb 2024', time: '13:10 - 14:10', place: 'Room 2', artistOne: 'Eloy J Rojas', artistTwo: '', artistName: 'Eloy J Rojas', sessionSubtitle: 'Afro Mambo' },
        { id: 34, flag: false, room: 'Room 2', sectionTitle: 'Saturday', date: 'Sat, 10 Feb 2024', time: '14:20 - 15:20', place: 'Room 2', artistOne: 'Timo Lingnau', artistTwo: '', artistName: 'Timo Lingnau', sessionSubtitle: 'Footwork' },
        { id: 35, flag: false, room: 'Room 2', sectionTitle: 'Saturday', date: 'Sat, 10 Feb 2024', time: '15:30 - 16:00', place: 'Room 2', artistOne: '', artistTwo: '', artistName: '', sessionSubtitle: 'Break' },
        { id: 36, flag: false, room: 'Room 2', sectionTitle: 'Saturday', date: 'Sat, 10 Feb 2024', time: '16:00 - 17:00', place: 'Room 2', artistOne: 'Roger Palombella', artistTwo: 'Edyta Kwasna', artistName: 'Roger & Edyta', sessionSubtitle: 'Salsa Musicality', sessionDescription: "Solo & Partnerwork", sessionType: "Solo & Partnerwork" },
        { id: 37, flag: false, room: 'Room 2', sectionTitle: 'Saturday', date: 'Sat, 10 Feb 2024', time: '17:10 - 18:10', place: 'Room 2', artistOne: '', artistTwo: '', artistName: '', sessionSubtitle: '' },
        { id: 38, flag: false, room: 'Room 2', sectionTitle: 'Saturday', date: 'Sat, 10 Feb 2024', time: '20:00 - 21:00', place: 'Room 2', artistOne: '', artistTwo: '', artistName: '', sessionSubtitle: '' },
       
       
        { id: 20, flag: false, room: 'Main Hall', sectionTitle: 'Sunday', date: 'Sun, 11 Feb 2024', time: '11:00 - 12:00', place: 'Main Hall', artistOne: 'Roger Palombella', artistTwo: 'Edyta Kwasna', artistName: 'Roger & Edyta', sessionSubtitle: 'Son Fundamentals' },
        { id: 21, flag: false, room: 'Main Hall', sectionTitle: 'Sunday', date: 'Sun, 11 Feb 2024', time: '12:10 - 13:10', place: 'Main Hall', artistOne: 'Yoyo Flow', artistTwo: '', artistName: 'Yoyo Flow', sessionSubtitle: 'Timba Solo' },
        { id: 22, flag: false, room: 'Main Hall', sectionTitle: 'Sunday', date: 'Sun, 11 Feb 2024', time: '13:20 - 14:20', place: 'Main Hall', artistOne: 'Yoyo Flow', artistTwo: '', artistName: 'Yoyo Flow', sessionSubtitle: 'Timba New Style' },
        { id: 23, flag: false, room: 'Main Hall', sectionTitle: 'Sunday', date: 'Sun, 11 Feb 2024', time: '14:30 - 15:30', place: 'Main Hall', artistOne: '', artistTwo: '', artistName: '', sessionSubtitle: 'Break' },
        { id: 24, flag: false, room: 'Main Hall', sectionTitle: 'Sunday', date: 'Sun, 11 Feb 2024', time: '15:30 - 16:30', place: 'Main Hall', artistOne: 'Andy Varona', artistTwo: 'Yuliet Estrada', artistName: 'Andy & Yuliet', sessionSubtitle: 'Rumba Guaguanco' },
        { id: 25, flag: false, room: 'Main Hall', sectionTitle: 'Sunday', date: 'Sun, 11 Feb 2024', time: '16:40 - 17:40', place: 'Main Hall', artistOne: 'Yoyo Flow', artistTwo: '', artistName: 'Yoyo Flow', sessionSubtitle: 'Reparto' },
        { id: 26, flag: false, room: 'Main Hall', sectionTitle: 'Sunday', date: 'Sun, 11 Feb 2024', time: '', place: '', artistOne: '', artistTwo: '', artistName: '', sessionSubtitle: '' },
        // { id: 27, flag: false, room: 'Main Hall', sectionTitle: 'Sunday', date: 'Sun, 11 Feb 2024', time: '', place: 'Main Hall', artistOne: '', artistTwo: '', artistName: '', sessionSubtitle: '' },
        { id: 40, flag: false, room: 'Room 2', sectionTitle: 'Sunday', date: 'Sun, 11 Feb 2024', time: '11:00 - 12:00', place: 'Room 2', artistOne: 'Yenifer Lavin', artistTwo: '', artistName: 'Yenifer Lavin', sessionSubtitle: 'Lady Styling' },
        { id: 41, flag: false, room: 'Room 2', sectionTitle: 'Sunday', date: 'Sun, 11 Feb 2024', time: '12:10 - 13:10', place: 'Room 2', artistOne: 'Lucas Flemming', artistTwo: 'Kimberly Wirt', artistName: 'Lucas & Kimmy', sessionSubtitle: 'Musicality in Timba' },
        { id: 42, flag: false, room: 'Room 2', sectionTitle: 'Sunday', date: 'Sun, 11 Feb 2024', time: '13:20 - 14:20', place: 'Room 2', artistOne: 'Roger Palombella', artistTwo: 'Edyta Kwasna', artistName: 'Roger & Edyta', sessionSubtitle: 'Solo Styling' },
        { id: 43, flag: false, room: 'Room 2', sectionTitle: 'Sunday', date: 'Sun, 11 Feb 2024', time: '14:30 - 15:30', place: 'Room 2', artistOne: '', artistTwo: '', artistName: '', sessionSubtitle: 'Break' },
        { id: 44, flag: false, room: 'Room 2', sectionTitle: 'Sunday', date: 'Sun, 11 Feb 2024', time: '15:30 - 16:30', place: 'Room 2', artistOne: 'Laura Del Vecchio', artistTwo: '', artistName: 'Laura Del Vecchio', sessionSubtitle: 'Reggaeton Fusion' },
        { id: 45, flag: false, room: 'Room 2', sectionTitle: 'Sunday', date: 'Sun, 11 Feb 2024', time: '16:40 - 17:40', place: 'Room 2', artistOne: 'Eloy J Rojas', artistTwo: '', artistName: 'Eloy J Rojas', sessionSubtitle: 'Mambo Fusion' },
        { id: 46, flag: false, room: 'Room 2', sectionTitle: 'Sunday', date: 'Sun, 11 Feb 2024', time: '', place: '', artistOne: '', artistTwo: '', artistName: '', sessionSubtitle: '' },
        // { id: 47, flag: false, room: 'Room 2', sectionTitle: 'Sunday', date: 'Sun, 11 Feb 2024', time: '', place: 'Room 2', artistOne: '', artistTwo: '', artistName: '', sessionSubtitle: '' }
    ]

    //this needs to be formatted based on the raw data; LauncherController will do this on initialize();
    static dataScheduleWithSections = null;

}

export default DataModel;