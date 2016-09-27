
#include <iostream>
#include <stdio.h>
#include <fstream>
#include <string>
#include <Windows.h>
using namespace std;

int containernummer = 0;
int containeranzahl = 4;
char bildbeschreibung[400];
string Unterordner[100];
string bildname;
string src;
fstream f;
HANDLE fHandle;
WIN32_FIND_DATA wfd;

void schreiben(int t){
	f << "\t\t\t\t<div id=\"c" << containernummer << "\" onclick=\"openLargePicture('" << Unterordner[t] << "', '" << bildname << "', 'c" << containernummer << "')\" class=\"galeriecontainer\">" << endl
	  << "\t\t\t\t\t<img src=\"" << src << bildname << "\" alt=\"" << bildbeschreibung << "\" width=\"130\" height=\"100\" >" << endl
	  << "\t\t\t\t\t<div class=\"bildbeschreibung\"> </div>" << endl
	  << "\t\t\t\t</div>" << endl;
}

int main(int argc, char **argv) {

	char *fileExt; //file
	char szDir[256]; //pfad
	GetFullPathName(argv[0], 256, szDir, &fileExt);
	strcpy (strstr (szDir,fileExt), "*\0"); // das File am Ende rauslöschen

	fHandle = FindFirstFile(szDir, &wfd);
	f.open("Containercode.txt", ios::out);

	int zaehler = 0;
	do { //alle Unterordner finden
		if (wfd.dwFileAttributes & FILE_ATTRIBUTE_DIRECTORY) { //Ordner gefunden
			if (wfd.cFileName[0] != '.'){
				//printf(TEXT("%s   <DIR>\n"), wfd.cFileName);
				Unterordner[zaehler] = wfd.cFileName;
				zaehler++;
			}
		} else { //Datei gefunden
			LARGE_INTEGER filesize;
	        filesize.LowPart = wfd.nFileSizeLow;
	        filesize.HighPart = wfd.nFileSizeHigh;
	        printf(TEXT("  %s   %i bytes\n"), wfd.cFileName, (unsigned int)filesize.QuadPart);
		}
	} while (FindNextFile(fHandle, &wfd)!= 0);
	FindClose(fHandle);

	for (int t = 0;t<zaehler;t++){ //alle unterordner durchgehen
		char aktuellerPfad[256];
		strcpy(aktuellerPfad,szDir);
		strcpy (strstr (aktuellerPfad, "*"), "\0"); // das * am Ende rauslöschen
		strcat(aktuellerPfad, Unterordner[t].c_str());
		strcat(aktuellerPfad, "\\large\\*\0"); // endordner + * anhängen
		cout << aktuellerPfad << endl;

		fHandle = FindFirstFile(aktuellerPfad, &wfd);
		do { //alle Dateien durchgehen
			if (wfd.dwFileAttributes & FILE_ATTRIBUTE_DIRECTORY) { //Ordner gefunden
				if (wfd.cFileName[0] != '.'){
					cout << "FEHLER - hier wurde einer zuviel oder kein  Ordner gefunden: " << aktuellerPfad <<endl;
				}
			} else { //Datei gefunden
				LARGE_INTEGER filesize;
		        filesize.LowPart = wfd.nFileSizeLow;
		        filesize.HighPart = wfd.nFileSizeHigh;
		        bildname = wfd.cFileName;
		        if (bildname.find(".jpg")!= string::npos){ //nur die jpgs finden
					printf(TEXT("  %s   %i bytes\n"), wfd.cFileName, (unsigned int)filesize.QuadPart);

					int len = 100000;
					char puffer[len];
					int startmeta=-1;
					int endmeta=-1;
					char metadata[10000];
					char aktuellerPfadOhneStern[256];
					strcpy(aktuellerPfadOhneStern,aktuellerPfad);
					aktuellerPfadOhneStern[strlen(aktuellerPfadOhneStern)-1] = 0;
					char bildpfad[256] = {0};
					strcat(bildpfad, aktuellerPfadOhneStern);
					strcat(bildpfad, bildname.c_str());
					fstream bild;
					bild.open(bildpfad, ios::in);
					if ( ! bild.is_open() ) {
					      cout <<" Failed to open: " << bildpfad << endl;
					} else {
					    cout <<"Opened OK" << endl;

					    bild.read(puffer,len); //ganzes Bild einlesen
						//metadaten finden
						for(int i = 0; i < len; i++){
							if ((puffer[i] == '<') && (puffer[i+1] == 'x') && (puffer[i+2] == ':') && (puffer[i+3] == 'x') && (puffer[i+4] == 'm') && (puffer[i+5] == 'p') && (puffer[i+6] == 'm') && (puffer[i+7] == 'e') && (puffer[i+8] == 't') && (puffer[i+9] == 'a')){
								startmeta = i;
							}
						}
						for(int i = 0; i < len; i++){
							if ((puffer[i] == '<') && (puffer[i+1] == '/') && (puffer[i+2] == 'x') && (puffer[i+3] == ':') && (puffer[i+4] == 'x') && (puffer[i+5] == 'm') && (puffer[i+6] == 'p') && (puffer[i+7] == 'm') && (puffer[i+8] == 'e') && (puffer[i+9] == 't') && (puffer[i+10] == 'a')){
								endmeta = i+13;
							}
						}
						if (startmeta == -1 || endmeta == -1 ){
							cout << "FEHLERFEHLERFEHLER" << endl;
						}
						//metadaten isolieren
						strncpy(metadata,&puffer[startmeta],(endmeta-startmeta));
						metadata[(endmeta-startmeta)-1]=0;
						//cout << "Metadaten :\n" << metadata << endl;

						//bildbeschreibung finden + isolieren
						char *bildnameanfang;
						bildnameanfang = strstr(metadata, "<rdf:li xml:lang=\"x-default\">");
						if (bildnameanfang != NULL){
							bildnameanfang += 29;
							char *bildnameende;
							bildnameende = strstr(bildnameanfang, "</rdf:li>");
							if ( bildnameende != NULL){
								strncpy(bildbeschreibung,bildnameanfang,(bildnameende - bildnameanfang));
								bildbeschreibung[(bildnameende - bildnameanfang)]=0;
							} else {
								cout << "Bildbeschreibungsende nicht gefunden" << endl;
								strcpy(bildbeschreibung,"Bildbeschreibung einfügen");
							}
						} else {
							cout << "Bildbeschreibung nicht gefunden" << endl;
							strcpy(bildbeschreibung,"Bildbeschreibung einfügen");
						}
						//cout << metadata << endl;
						//cout << bildbeschreibung << endl;
						bild.close();
					}
					src = "images/thumb/";
					src = Unterordner[t] + "/thumb/";
					containernummer++;
					schreiben(t);
					cout << endl;
		        }
			}
		} while (FindNextFile(fHandle, &wfd)!= 0);
		FindClose(fHandle);
		f << "\n\n";
		containernummer = 0;
	}

    f.close();
	cout << "\nlief! - Press any key to exit" << endl;
	getchar();
	return 0;
}

