1. 

a. GPU eða graphics processing unit er tegund af processor sem er sérstaklega hannaður til að rendera grafík og reikna út hluti tengt því.  Hann gegnir mjög miklvægu hlutverki í 3d grafík þar sem hann er að reikna út og finna hvernig allt á að líta út sem pixlar.

b. Pixlar eru púnktarnir á skjánum sem saman verða að mynd.  Þeir eru oftast samsettir úr einhverju sem getur gert rauðan, grænan og bláan lit, t.d. led perum í OLED skjá.  Allri grafík þarf að vera breytt yfir í pixla áður en það er hægt að sýna það á skjánum.

c. Frame buffer er mynni sem geymir upplýsingar um alla pixlana fyrir framein sem eiga eða koma næst.  Raster scan er leið sem skjáir eða sjónvörp nota til að birta myndir á skjánum með því að skipta henni upp í línur og uppfæra eina línu í einu.

d. WebGL og OpenGL eru graphics library sem eru notað til að rendera 2d og 3d grafík.  WebGL er fyrir vefinn og er innibyggður í browserum en OpenGL er fyrir allt annað eins og t.d. desktop application. 

2. Af því það að þrýr punktar eru það minnsta sem þú þarft til að búa til einhvað form svo það er hægt að búa til hvað sem er með þrýhirningum.

3. Fyrst er Vertex set (x, y, z púnktar) sem þú gerir,  það er síðan sett inn í uniform bufferinn sem er notaður til að geyma það. Vertex shaderinn notar það síðan til að reykna út hvar púnktarnir eiga að vera á skjánum og setja 
   það inn í varyings sem eru í raun bara variable inn í Vertex shadernum. Næst er Fragment shaderinn sem nær í öll gögnin úr varyings í Vertex shadernum og reyknar út litinn á öllum pixlunum inn á milli púnktana.
   Það er síðan geymt sem pixlar í frame buffernum sem er síðan sett inn á canvasinn.

4. Þau eru mikið betri en aðrar leiðir til að gera translate, rotation og scale.  Það er líka hægt að nota það til að reykna út alla púnktana á einhverjum hlut í 3d.  Svo er líka hægt að margfalda mörg fylki saman svo að það sé hægt að gera translate, rotation og scale allt í einu sem er mikið einfaldara fyrir tölvuna heldur en að vera að reykna út fyrir hvert og eitt.

5. Shader er í rauninni bara forrit inn í leiknum sem er runað á skjákortinu síðan.  Í byrjun eru bara 2 shaderar, Vertex shader og Fragment shader þar sem Vertex reyknar út staðsetningu púnktana á skjánum og Fragment shader finnur út litinn fyrir hvern pixla.  GLSL eða OpenGL Shading Language er forritunarmál sem er notað til að búa til shadera.  Það er sérstaklega hannað til að reykna út hluti tengda því og þess vegna er það mjög gott til að gera shadera.

6. [Linkur](https://files.gudmunduro.com/webgl-triangle/)
