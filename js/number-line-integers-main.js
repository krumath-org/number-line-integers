// Copyright 2019-2024, University of Colorado Boulder

/**
 * Main entry point for the sim.
 *
 * @author John Blanco (PhET Interactive Simulations)
 */

import './applyKantumruyFontFamily.js';

import DerivedProperty from '../../axon/js/DerivedProperty.js';
import Sim from '../../joist/js/Sim.js';
import localeProperty from '../../joist/js/i18n/localeProperty.js';
import simLauncher from '../../joist/js/simLauncher.js';
import { combineOptions } from '../../phet-core/js/optionize.js';
import HBox from '../../scenery/js/layout/nodes/HBox.js';
import PhetFont from '../../scenery-phet/js/PhetFont.js';
import TextPushButton from '../../sun/js/buttons/TextPushButton.js';
import Tandem from '../../tandem/js/Tandem.js';
import NLIExploreScreen from './explore/NLIExploreScreen.js';
import NLIGenericScreen from './generic/NLIGenericScreen.js';
import NumberLineIntegersStrings from './NumberLineIntegersStrings.js';

const numberLineIntegersTitleStringProperty = NumberLineIntegersStrings[ 'number-line-integers' ].titleStringProperty;

const simOptions = {
  credits: {
    leadDesign: 'Amanda McGarry',
    softwareDevelopment: 'John Blanco, Chris Klusendorf, Marla Schulz, Saurabh Totey',
    team: 'Ariel Paul, Kathy Perkins, and in cooperation with the Next-Lab project',
    qualityAssurance: 'Logan Bray, Jaron Droder, Clifford Hardin, Liam Mulhall, Jacob Romero, Nancy Salpepi, Kathryn Woessner',
    graphicArts: 'Megan Lai',
    soundDesign: '',
    thanks: ''
  }
};

const createLanguageSwitch = () => {
  const createLanguageButton = ( label, locale, segment ) => {
    const isLeftSegment = segment === 'left';
    const selectedProperty = new DerivedProperty( [ localeProperty ], currentLocale => currentLocale === locale, {
      tandem: Tandem.OPT_OUT
    } );

    return new TextPushButton( label, {
      font: new PhetFont( { family: 'Kantumruy Pro', size: 16, weight: 'bold' } ),
      textFill: 'white',
      minWidth: 78,
      minHeight: 38,
      xMargin: 12,
      yMargin: 7,
      baseColor: localeProperty.value === locale ? '#087e73' : '#37464a',
      stroke: '#9aafb0',
      lineWidth: 1,
      cornerRadius: 0,
      leftTopCornerRadius: isLeftSegment ? 8 : 0,
      leftBottomCornerRadius: isLeftSegment ? 8 : 0,
      rightTopCornerRadius: isLeftSegment ? 0 : 8,
      rightBottomCornerRadius: isLeftSegment ? 0 : 8,
      accessibleRoleConfiguration: 'toggle',
      accessiblePressedProperty: selectedProperty,
      listener: () => { localeProperty.value = locale; },
      tandem: Tandem.ROOT.createTandem( `languageSwitch${locale === 'km' ? 'Khmer' : 'English'}` )
    } );
  };

  const khmerButton = createLanguageButton( 'ខ្មែរ', 'km', 'left' );
  const englishButton = createLanguageButton( 'English', 'en', 'right' );

  localeProperty.link( locale => {
    khmerButton.baseColor = locale === 'km' ? '#087e73' : '#37464a';
    englishButton.baseColor = locale === 'en' ? '#087e73' : '#37464a';
  } );

  return new HBox( { children: [ khmerButton, englishButton ], spacing: 0 } );
};

const launchSimulation = () => {
  localeProperty.value = 'km';

  const screens = [
    new NLIExploreScreen( Tandem.ROOT.createTandem( 'exploreScreen' ) ),
    new NLIGenericScreen( Tandem.ROOT.createTandem( 'genericScreen' ) )
  ];
  const sim = new Sim( numberLineIntegersTitleStringProperty, screens, combineOptions( {}, simOptions, {
    homeScreenWarningNode: createLanguageSwitch()
  } ) );
  sim.start();
};

const kantumruyFont = new FontFace(
  'Kantumruy Pro',
  `url(${new URL( 'images/KantumruyProKhmer.woff2', window.location.href )})`,
  { weight: '100 900' }
);

kantumruyFont.load().then( loadedFont => {
  document.fonts.add( loadedFont );
  simLauncher.launch( launchSimulation );
} ).catch( error => {
  console.error( 'Unable to load Kantumruy Pro; using the default font.', error );
  simLauncher.launch( launchSimulation );
} );