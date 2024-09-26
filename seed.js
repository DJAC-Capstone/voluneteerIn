/* eslint-disable no-console */
const { green, red } = require('chalk');
const { db, User, Events } = require('./server/db/index.js');


// dummy users
const users = [{
  first_name: 'Rosmunda', last_name: 'Shallo', imgURL:'1.jpg', gender: 'Female', date_of_birth: '09/27/1974', phone: '814-945-7229', email: 'rshallo0@elpais.com', password: 'F2FyVTnjSl',
},
{
  first_name: 'Olly', last_name: 'Dufour',imgURL:'2.jpg', gender: 'Male', date_of_birth: '12/23/2001', phone: '443-592-6197', email: 'ooo@ooo.com', password: '123', 
},
{
  first_name: 'Tracee', last_name: 'Mattsson',imgURL:'3.jpg', gender: 'Female', date_of_birth: '11/10/1980', phone: '650-822-0995', email: 'tmattsson2@salon.com', password: 'PkR7NvA',
},
{
  first_name: 'Blair', last_name: 'Cordingly',imgURL:'4.jpg', gender: 'Female', date_of_birth: '03/23/1991', phone: '543-637-8643', email: 'bcordingly3@instagram.com', password: '8L6qab',
},
{
  first_name: 'Bethina', last_name: 'Penella',imgURL:'5.jpg', gender: 'Female', date_of_birth: '08/08/1977', phone: '748-233-2263', email: 'bpenella4@usda.gov', password: 'QOzFoa4i',
},
{
  first_name: 'Sadella', last_name: 'Farmery',imgURL:'6.jpg', gender: 'Female', date_of_birth: '06/30/1981', phone: '359-818-3576', email: 'sfarmery5@stumbleupon.com', password: '7F4wU9JuEfe',
},
{
  first_name: 'Christos', last_name: 'Musson',imgURL:'7.jpg', gender: 'Male', date_of_birth: '10/31/1971', phone: '791-444-9786', email: 'cmusson6@facebook.com', password: 'Pxo013Dinb',
},
{
  first_name: 'Wilden', last_name: 'Crossfeld',imgURL:'8.jpg', gender: 'Male', date_of_birth: '10/12/1993', phone: '803-102-6204', email: 'wcrossfeld7@nps.gov', password: 'xS27yn',
},
{
  first_name: 'Abbey', last_name: 'Ethelstone',imgURL:'9.jpg', gender: 'Male', date_of_birth: '10/21/1980', phone: '105-646-4518', email: 'aethelstone8@europa.eu', password: '0TXdOtJ',
},
{
  first_name: 'Roscoe', last_name: 'Reynoollds',imgURL:'10.jpg', gender: 'Male', date_of_birth: '03/26/1973', phone: '948-109-6844', email: 'rreynoollds9@dedecms.com', password: 'abBz2TVc',
},
{
  first_name: 'Daria', last_name: 'Gallier',imgURL:'11.jpg', gender: 'Female', date_of_birth: '12/03/1976', phone: '220-425-3855', email: 'dgalliera@cisco.com', password: 'bEZPWXpVr9F6',
},
{
  first_name: 'Alric', last_name: 'Mallaby',imgURL:'12.jpg', gender: 'Male', date_of_birth: '08/17/1995', phone: '116-646-8872', email: 'amallabyb@nasa.gov', password: 'd3oKQe3egDKA',
},
{
  first_name: 'Antoni', last_name: 'Iles',imgURL:'13.jpg', gender: 'Male', date_of_birth: '09/02/1999', phone: '629-423-4260', email: 'ailesc@a8.net', password: 'N3Pgs4Yw',
},
{
  first_name: 'Vin', last_name: 'Garratty',imgURL:'14.jpg', gender: 'Female', date_of_birth: '06/18/1993', phone: '404-195-1038', email: 'vgarrattyd@is.gd', password: 'vDeJZDrS',
},
{
  first_name: 'Annetta', last_name: 'McVity',imgURL:'15.jpg', gender: 'Female', date_of_birth: '01/03/1980', phone: '290-481-5387', email: 'amcvitye@java.com', password: 'WXIXDWiM7',
},
{
  first_name: 'Ram', last_name: 'Cochet',imgURL:'16.jpg', gender: 'Male', date_of_birth: '08/29/1981', phone: '547-539-4480', email: 'rcochetf@harvard.edu', password: 'bQtXtnxbEIk',
},
{
  first_name: 'Park', last_name: 'Miche',imgURL:'17.jpg', gender: 'Male', date_of_birth: '09/18/1995', phone: '530-882-1763', email: 'pmicheg@simplemachines.org', password: 'ykg2AX',
},
{
  first_name: 'Karalynn', last_name: 'Corradini', imgURL:'18.jpg', gender: 'Female', date_of_birth: '03/30/1972', phone: '482-803-6021', email: 'kcorradinih@about.com', password: 'QNLEXoub',
},
{
  first_name: 'Odessa', last_name: 'Bonhomme',imgURL:'19.jpg', gender: 'Female', date_of_birth: '01/29/1971', phone: '209-318-8421', email: 'obonhommei@prweb.com', password: 'vRF3X7',
},
{
  first_name: 'Sully', last_name: 'Klees',imgURL:'20.jpg', gender: 'Male', date_of_birth: '01/01/2001', phone: '539-159-4350', email: 'skleesj@ustream.tv', password: 'raXzKPo',
},
// {
//   first_name: 'Vincents', last_name: 'MacGauhy', gender: 'Male', date_of_birth: '12/23/1972', phone: '489-119-5726', email: 'vmacgauhyk@acquirethisname.com', password: 'fq8woCKDS4U3',
// },
// {
//   first_name: 'El', last_name: 'Slateford', gender: 'Male', date_of_birth: '09/20/1977', phone: '568-968-1732', email: 'eslatefordl@washingtonpost.com', password: 'YFtxB7Vddi3',
// },
// {
//   first_name: 'Tilda', last_name: 'Dudlestone', gender: 'Female', date_of_birth: '01/11/1972', phone: '347-251-3515', email: 'tdudlestonem@slashdot.org', password: 'T9UB1Pytli',
// },
// {
//   first_name: 'Haily', last_name: 'Banbrick', gender: 'Male', date_of_birth: '07/29/1983', phone: '678-840-8586', email: 'hbanbrickn@posterous.com', password: 'L8ykUnRpgYtR',
// },
// {
//   first_name: 'Olga', last_name: 'Battle', gender: 'Female', date_of_birth: '08/28/1985', phone: '457-576-6711', email: 'obattleo@mediafire.com', password: 'vt9FTp2lo',
// },
// {
//   first_name: 'Aurea', last_name: 'Worlidge', gender: 'Female', date_of_birth: '05/14/1991', phone: '505-370-0618', email: 'aworlidgep@shareasale.com', password: 'qegjCfFLvlJS',
// },
// {
//   first_name: 'Lindsay', last_name: 'McCrie', gender: 'Male', date_of_birth: '07/19/1979', phone: '565-980-9871', email: 'lmccrieq@canalblog.com', password: 'iaNKP5FGbJW',
// },
// {
//   first_name: 'Lindsay', last_name: 'Pays', gender: 'Male', date_of_birth: '06/02/1971', phone: '885-907-2301', email: 'lpaysr@desdev.cn', password: 'Gg0y6q',
// },
// {
//   first_name: 'Steve', last_name: 'Sedcole', gender: 'Male', date_of_birth: '09/05/1988', phone: '628-495-1765', email: 'ssedcoles@baidu.com', password: 'tGyQRlJWsw0',
// },
// {
//   first_name: 'Karoline', last_name: 'Rearden', gender: 'Female', date_of_birth: '03/10/1992', phone: '442-724-5537', email: 'kreardent@spiegel.de', password: '9bDDskf2SCq',
// },
// {
//   first_name: 'Ruthanne', last_name: 'Mazzia', gender: 'Female', date_of_birth: '06/16/1998', phone: '233-313-0326', email: 'rmazziau@java.com', password: '3LiGhoeu',
// },
// {
//   first_name: 'Cristian', last_name: 'Mitcheson', gender: 'Male', date_of_birth: '12/06/1981', phone: '165-778-1375', email: 'cmitchesonv@weebly.com', password: 'eWM1SRJVm',
// },
// {
//   first_name: 'Aland', last_name: 'Zielinski', gender: 'Male', date_of_birth: '07/05/1975', phone: '239-796-5171', email: 'azielinskiw@fastcompany.com', password: 'mc6euDbEa1',
// },
// {
//   first_name: 'Katti', last_name: 'Geyton', gender: 'Female', date_of_birth: '03/17/1992', phone: '798-618-6558', email: 'kgeytonx@howstuffworks.com', password: 'arXTkwQM0',
// },
// {
//   first_name: 'Crystal', last_name: 'Ivimy', gender: 'Female', date_of_birth: '10/18/1993', phone: '694-529-5390', email: 'civimyy@ca.gov', password: 'FXf3wHzJ',
// },
// {
//   first_name: 'Mitzi', last_name: 'Hymas', gender: 'Female', date_of_birth: '11/22/1979', phone: '833-110-1578', email: 'mhymasz@npr.org', password: 'duprg2LkWL',
// },
// {
//   first_name: 'Denys', last_name: 'Keaves', gender: 'Male', date_of_birth: '02/21/2000', phone: '560-513-1112', email: 'dkeaves10@e-recht24.de', password: 'UFMMbA2CJ',
// },
// {
//   first_name: 'Leora', last_name: 'Puddephatt', gender: 'Female', date_of_birth: '09/02/1986', phone: '596-200-6670', email: 'lpuddephatt11@nba.com', password: 'hx6Fg1n7',
// },
// {
//   first_name: 'Iver', last_name: 'McIlory', gender: 'Male', date_of_birth: '08/28/2001', phone: '307-402-4419', email: 'imcilory12@amazonaws.com', password: 'xCHKcXvR',
// },
// {
//   first_name: 'Mamie', last_name: 'Tadman', gender: 'Female', date_of_birth: '11/28/2000', phone: '223-608-7203', email: 'mtadman13@examiner.com', password: '5NDRHHyk',
// },
// {
//   first_name: 'Darci', last_name: 'Grcic', gender: 'Female', date_of_birth: '04/06/1991', phone: '381-537-2426', email: 'dgrcic14@huffingtonpost.com', password: 'lxbPA1b4aYZE',
// },
// {
//   first_name: 'Kessiah', last_name: 'Aaron', gender: 'Female', date_of_birth: '09/22/1973', phone: '911-415-0382', email: 'kaaron15@wikipedia.org', password: 'T3ZJWHNzp65M',
// },
// {
//   first_name: 'Chrissy', last_name: 'Skittrall', gender: 'Male', date_of_birth: '10/27/1998', phone: '913-837-0225', email: 'cskittrall16@sfgate.com', password: 'HUioxvWa7',
// },
// {
//   first_name: 'Estell', last_name: 'Raimbauld', gender: 'Female', date_of_birth: '06/12/1998', phone: '105-201-6179', email: 'eraimbauld17@unicef.org', password: 'aM1KABYg',
// },
// {
//   first_name: 'Nedda', last_name: 'Pleasants', gender: 'Female', date_of_birth: '02/03/1998', phone: '930-446-4929', email: 'npleasants18@wired.com', password: 'ztL026uhk',
// },
// {
//   first_name: 'Kalila', last_name: 'Caser', gender: 'Female', date_of_birth: '12/08/1999', phone: '113-516-6480', email: 'kcaser19@edublogs.org', password: 'dTvwey',
// },
// {
//   first_name: 'Janeta', last_name: 'Andor', gender: 'Female', date_of_birth: '01/14/1975', phone: '201-673-5471', email: 'jandor1a@typepad.com', password: 'U00ry8PEKp',
// },
// {
//   first_name: 'Marline', last_name: 'Northidge', gender: 'Female', date_of_birth: '07/11/1974', phone: '537-971-1845', email: 'mnorthidge1b@dion.ne.jp', password: '0GCoSr',
// },
// {
//   first_name: 'Daren', last_name: 'Puttrell', gender: 'Male', date_of_birth: '08/30/1976', phone: '310-451-9540', email: 'dputtrell1c@de.vu', password: 'QryHh1K3',
// },
// {
//   first_name: 'Freddy', last_name: 'Blakeston', gender: 'Male', date_of_birth: '12/17/1988', phone: '818-210-6335', email: 'fblakeston1d@youtu.be', password: 'zl5P76H',
];

const events = [{
  title: 'NYC Mean Street Clean Up', image:'https://www.webfx.com/blog/images/assets/images.sixrevisions.com/2010/12/10-01_volunteer_web_design.jpg', description: 'Clean these mean New York City Streets', date: '01/01/2021', time: '12:55 AM', duration: 2, street_address: '71026 Corry Plaza', city: 'San Antonio', state: 'Texas', zip_code: '78265', donation: '$602.28', comments: 'Proactive reciprocal projection',
},
{
  title: 'Mature Love Session', image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDO1BI2iEdX44oCJMEUhP0e_J6783j7jSZYg&usqp=CAU', description: 'Spend some time with some mature citizens!', date: '09/13/2021', time: '5:43 PM', duration: 3.5, street_address: '56 La Follette Circle', city: 'Sacramento', state: 'California', zip_code: '95894', donation: '$1796.30', comments: 'Organized holistic Graphic Interface',
},
{
  title: 'Kids Rockin Saturday ', image:'https://cdn-media-1.lifehack.org/wp-content/files/2014/05/Reasons-To-Do-Voluntary-Work.jpg', description: 'Saturday morning fun zone for kids!', date: '06/15/2021', time: '7:14 PM', duration: 3, street_address: '60 Golf Street', city: 'Pompano Beach', state: 'Florida', zip_code: '33064', donation: '$937.45', comments: 'User-centric background structure',
},
{
  title: 'Calling all Young Chefs of Manalapan-Englishtown', image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS73MSgBNMGDMobaQY7hZkAXIf9bBbBbVG9RA&usqp=CAU', description: 'We want to highlight your young chef’s favorite recipes to be included in our community cookbook! There is no limit to the number of recipes you can send. Submit your recipes by November 2nd.', date: '11/19/2021', time: '12:16 AM', duration: 2, street_address: '47 Pepper Wood Hill', city: 'San Jose', state: 'new', zip_code: '95133', donation: '$570.92', comments: 'Business-focused clear-thinking time-frame',
},
{
  title: 'Combat Food Insecurity in the Bronx!', image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6x1JH4ACV_X-Xv-NzV18CbKqeVPkPediWAQ&usqp=CAU', description: 'New York Common Pantry works toward the reduction of hunger and food insecurity through an array of programs that function to establish long-term independence for those we serve. ', date: '02/10/2021', time: '1:34 PM', duration: 2, street_address: '7 Calypso Circle', city: 'Bronx', state: 'New York', zip_code: '1062', donation: '$528.15', comments: 'Digitized eco-centric attitude',
},
{
  title: 'Resurrection and Life Food Pantry Assistance', image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_QrFYQzKyrsSg9DbduRP7bNPVVSdFXBX1GA&usqp=CAU', description: 'The Resurrection and Life Food Pantry needs volunteers to help with their food pantry!', date: '01/12/2021', time: '9:07 PM', duration: 4, street_address: '62198 Moose Center', city: 'Atlanta', state: 'Georgia', zip_code: '30301', donation: '$1463.75', comments: 'Compatible solution-oriented system engine',
},
{
  title: 'Christmas Toy Giveaway Event', image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTV0gPofHsR5FUvtLcvaEYHbmlw8S531ZHFXA&usqp=CAU', description: 'We are seeking energetic and passionate individuals with a heart for service to volunteer giving out toys to low-income children and families during our Annual Christmas Giveaway Event.', date: '08/27/2021', time: '5:55 PM', duration: 1.5, street_address: '89 Twin Pines Pass', city: 'Independence', state: 'Missouri', zip_code: '64054', donation: '$1884.03', comments: 'Secured mission-critical frame',
},
{
  title: 'metus vitae ipsum aliquam non mauris morbi', image:'https://www.wellington.ca/en/resident-services/resources/Terrace/website-refresh-2017/interiorWT-Join-Banner.jpg', description: 'pellentesque ultrices phasellus id sapien in sapien iaculis congue vivamus metus arcu adipiscing molestie hendrerit at vulputate vitae nisl aenean lectus pellentesque eget nunc donec', date: '10/11/2021', time: '9:04 AM', duration: 2, street_address: '66 Redwing Alley', city: 'Kansas City', state: 'Missouri', zip_code: '64125', donation: '$1473.60', comments: 'Monitored dedicated software',
},
{
  title: 'Overnight Live-in Volunteer at Safe House', image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBatpHgakpo818aiFMLrxskvbjIwziRKt6EQ&usqp=CAU', description: 'LifeWay Network is a 501(c)(3) nonprofit organization that joins the global movement against human trafficking by providing safe housing for women who have been trafficked, and offering education about trafficking to the general public. ', date: '12/19/2020', time: '9:49 AM', duration: 3, street_address: '729 Ramsey Parkway', city: 'Seattle', state: 'Washington', zip_code: '98109', donation: '$1127.01', comments: 'Distributed heuristic project',
},
{
  title: 'Times Up! - Grant Writer', image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwCvd3z6NqxI5Pl64rLbtURjdQ3-vZ4uBj8w&usqp=CAU', description: 'Times Up!, a thirty year old nonprofit environmental organization located in New York City, is looking for a grant writer.Times Up! organizes several environmental campaigns and coordinates hundreds of educational events each year.', date: '08/06/2021', time: '8:44 AM', duration: 2.5, street_address: '9 Fordem Street', city: 'Elmira', state: 'New York', zip_code: '14905', donation: '$451.60', comments: 'Realigned motivating strategy',
},
{
  title: 'Winter Rain Garden Stewardship', image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu2yitE-NTyTNHcVcpNN2TyIp9G4AdCj-OEg&usqp=CAU', description: 'Volunteers will maintain rain gardens and bioswales throughout Gowanus.', date: '09/26/2021', time: '2:53 PM', duration: 3, street_address: '5585 Continental Terrace', city: 'Baltimore', state: 'Maryland', zip_code: '21275', donation: '$1219.81', comments: 'User-centric encompassing flexibility',
},
{
  title: 'Help redistribute donations to those in need in your community!', image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6KTrar5Og3IzLx7rKSlAKPehx3dumOrrg8A&usqp=CAU', description: 'Round 2 Resources is looking for volunteers for multiple positions: Men and women are needed to help pick up furniture at donors homes and deliver them to the clients in need of those items.', date: '01/03/2021', time: '12:27 PM', duration: 1, street_address: '5 Elmside Street', city: 'Charleston', state: 'West Virginia', zip_code: '25362', donation: '$1398.13', comments: 'Function-based bandwidth-monitored archive',
},
{
  title: 'morbi odio odio elementum eu interdum eu', image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmyZxekVce_p69eqpy_ORpUwfKmp7o4oPXTg&usqp=CAU', description: 'proin eu mi nulla ac enim in tempor turpis nec euismod scelerisque quam turpis adipiscing lorem vitae mattis nibh ligula nec sem duis aliquam convallis nunc', date: '04/06/2021', time: '11:40 AM', duration: 2, street_address: '76031 Oxford Crossing', city: 'Raleigh', state: 'North Carolina', zip_code: '27621', donation: '$175.08', comments: 'Triple-buffered impactful productivity',
},
{
  title: 'velit donec diam neque vestibulum eget vulputate ut', image:'https://coda.newjobs.com/api/imagesproxy/ms/niche/images/articles/CompanyVolunteering.jpg', description: 'erat id mauris vulputate elementum nullam varius nulla facilisi cras non velit nec nisi vulputate nonummy maecenas tincidunt lacus at velit vivamus vel nulla eget eros elementum pellentesque', date: '01/14/2021', time: '3:11 AM', duration: 1.5, street_address: '50 Kennedy Circle', city: 'Kansas City', state: 'Missouri', zip_code: '64153', donation: '$1884.32', comments: 'Multi-tiered dedicated database',
},
{
  title: 'quis orci eget orci vehicula condimentum curabitur in', image:'https://livelearn.ca/wp-content/uploads/2018/07/volunteers-2654004_1280.jpg', description: 'tortor id nulla ultrices aliquet maecenas leo odio condimentum id luctus nec molestie sed justo pellentesque viverra pede ac diam cras pellentesque volutpat dui maecenas', date: '06/25/2021', time: '1:54 AM', duration: 1.5, street_address: '2 Moulton Trail', city: 'Richmond', state: 'Virginia', zip_code: '23237', donation: '$405.28', comments: 'Reduced value-added standardization',
},
{
  title: 'parturient montes nascetur ridiculus mus etiam vel augue', image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLBJVsMZJy47BX7BRi4DmOcsp0piSC9TVPsg&usqp=CAU', description: 'proin leo odio porttitor id consequat in consequat ut nulla sed accumsan felis ut at dolor quis odio consequat varius integer ac leo pellentesque ultrices mattis odio donec vitae nisi', date: '10/10/2021', time: '11:52 PM', duration: 1.5, street_address: '57 Hayes Court', city: 'Garden Grove', state: 'California', zip_code: '92645', donation: '$1487.71', comments: 'Diverse asymmetric parallelism',
},
{
  title: 'morbi a ipsum integer a nibh in quis justo', image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDKjVOYKwdTj9o3Wgxg0Qr8galPYhiVtl5eg&usqp=CAU', description: 'vulputate justo in blandit ultrices enim lorem ipsum dolor sit amet consectetuer adipiscing elit proin interdum mauris non ligula pellentesque ultrices phasellus id sapien in sapien iaculis congue', date: '05/24/2021', time: '8:05 AM', duration: 4, street_address: '8234 Lunder Park', city: 'Chattanooga', state: 'Tennessee', zip_code: '37405', donation: '$430.07', comments: 'Multi-layered bi-directional projection',
},
{
  title: 'semper est quam pharetra magna', image:'https://tourismteacher.com/wp-content/uploads/2019/03/ivhq-volunteer-forever-image-1.jpg', description: 'fermentum justo nec condimentum neque sapien placerat ante nulla justo aliquam quis turpis eget elit sodales scelerisque mauris sit amet eros suspendisse accumsan tortor quis turpis sed', date: '09/17/2021', time: '12:43 PM', duration: 1, street_address: '76 Spohn Crossing', city: 'Washington', state: 'District of Columbia', zip_code: '20231', donation: '$982.20', comments: 'Compatible actuating data-warehouse',
},
{
  title: 'ultrices posuere cubilia curae donec', image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeZeH1t5cynPXzy-TEScAnDhiQRHqCJDm64g&usqp=CAU', description: 'ut at dolor quis odio consequat varius integer ac leo pellentesque ultrices mattis odio donec vitae nisi nam ultrices libero non mattis pulvinar nulla pede ullamcorper augue a', date: '03/26/2021', time: '7:44 AM', duration: 1, street_address: '21504 Debra Junction', city: 'Dallas', state: 'Texas', zip_code: '75265', donation: '$940.35', comments: 'De-engineered asymmetric concept',
},
{
  title: 'Food for Friends', image:'https://cdn.pixabay.com/photo/2018/04/27/16/10/volunteer-3355065_1280.jpg', description: 'Taking some quality time to share a meal with those in need', date: '04/18/2021', time: '7:23 PM', duration: 3.5, street_address: '2442 Memorial Junction', city: 'Washington', state: 'District of Columbia', zip_code: '20029', donation: '$1251.05', comments: 'Face to face exuding paradigm',
}];

const seed = async () => {
  try {
    await db.sync({ force: true });
    const createdEvents = await Promise.all(events.map((event) => Events.create({ ...event })));
    const createdUsers = await Promise.all(users.map((user) => User.create({ ...user })));
    // const createdUsers = users.map(async (u) => await User.create(u))
    
    for (let i = 0; i < createdEvents.length; i++) {
      await createdEvents[i].setUsers(createdUsers[Math.floor(Math.random() * createdUsers.length)]);
    }
  } catch (err) {
    console.log(red(err));
  }
};
module.exports = seed;

if (require.main === module) {
  seed()
    .then(() => {
      console.log(green('Seeding success!'));
      db.close();
    })
    .catch((err) => {
      console.error(red('Oh noes! Something went wrong!'));
      console.error(err);
      db.close();
    });
}
